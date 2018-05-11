import { first, last, orderBy, uniq, uniqBy } from 'lodash';
import { action, computed, observable } from 'mobx';
import remoteDev from 'mobx-remotedev';
import firebase, { RNFirebase } from 'react-native-firebase';
import { collection } from '../constants';
import {
  INotesStore,
  IRootStore,
  NoteClient,
  PopulatedNotedClient,
  UserAccountClient,
} from '../types';
import { BaseStore } from './BaseStore';
import {
  transformServerUserAccountToClient,
  transformSnapToNote,
  transformSnapToUserAccount,
} from './helpers';
import { DEFAULT_USER_ACCOUNT } from './UserAccountStore';

type QueryIdentifier = 'user' | 'all';
const DEFAULT_PAGE_SIZE = 5;

interface UserAccountObject {
  [uid: string]: UserAccountClient;
}

const firestore = firebase.firestore();

@remoteDev({
  name: 'NotesStore',
  remote: false,
})
class NotesStore extends BaseStore implements INotesStore {
  private queryIdentifier: QueryIdentifier;
  private query!: RNFirebase.firestore.Query;

  private cursor?: RNFirebase.firestore.DocumentSnapshot;
  private lastKnownEntry?: RNFirebase.firestore.DocumentSnapshot;

  @observable private _notes: PopulatedNotedClient[] = [];
  @observable public loading = false;
  public userAccounts: UserAccountObject = {};

  @computed
  get notes(): PopulatedNotedClient[] {
    return this._notes;
  }

  set notes(notes: PopulatedNotedClient[]) {
    this._notes = notes;
  }

  constructor(stores: IRootStore, queryIdentifier: QueryIdentifier) {
    super(stores);
    this.queryIdentifier = queryIdentifier;
  }

  private setQuery = () => {
    const { user } = this.stores.authStore;
    if (this.queryIdentifier === 'user' && user) {
      this.query = firestore
        .collection(collection.NOTES)
        .where('uid', '==', user.uid)
        .orderBy('timestamp', 'desc');
    } else {
      this.query = firestore
        .collection(collection.NOTES)
        .orderBy('timestamp', 'desc');
    }
  };

  @action
  private setLoading = (status: boolean) => {
    this.loading = status;
  };

  public async init() {
    this.setQuery();
    await this.loadNotes();
  }

  public async joinProfiles(
    notes: NoteClient[],
  ): Promise<PopulatedNotedClient[]> {
    const uids = notes
      .map(note => note.ownerId)
      .filter(uid => this.userAccounts[uid] === undefined);
    const userAccountPromises = uniq(uids).map(uid =>
      (async () => {
        try {
          const userAccountDoc = await firestore
            .collection('users')
            .doc(uid)
            .get();
          this.userAccounts[uid] = transformSnapToUserAccount(userAccountDoc);
        } catch (e) {
          this.userAccounts[uid] = transformServerUserAccountToClient(
            uid,
            DEFAULT_USER_ACCOUNT,
          );
        }
      })(),
    );
    await Promise.all(userAccountPromises);
    return notes.map(note => {
      const userAccount = this.userAccounts[note.ownerId];
      return { ...note, user: userAccount };
    });
  }

  public async checkForNewEntriesInNotes(): Promise<void> {
    if (this.lastKnownEntry) {
      const snap = await this.query.endBefore(this.lastKnownEntry).get();
      if (snap.docs.length === 0) {
        return;
      }
      const notes: NoteClient[] = [];
      snap.forEach(noteDoc => {
        notes.push(transformSnapToNote(noteDoc));
      });
      const populatedNotes = await this.joinProfiles(notes);
      this.addToFeed(populatedNotes);
      this.lastKnownEntry = snap.docs[0];
    }
  }

  public async loadNotes(): Promise<void> {
    // eslint-disable-next-line prefer-destructuring
    this.setLoading(true);
    let query = this.query;
    if (this.cursor) {
      query = query.startAfter(this.cursor);
    }
    const snap = await query.limit(DEFAULT_PAGE_SIZE).get();
    if (snap.docs.length === 0) {
      if (!this.notes) {
        this.notes = [];
      }
      return;
    }
    const notes: NoteClient[] = [];
    snap.forEach(noteDoc => {
      notes.push(transformSnapToNote(noteDoc));
    });
    const notesFeed = await this.joinProfiles(notes);
    if (!this.notes) {
      this.notes = [];
      this.lastKnownEntry = first(snap.docs);
    }
    this.addToFeed(notesFeed);
    this.cursor = last(snap.docs);
    this.setLoading(false);
  }

  public addToFeed(entries: PopulatedNotedClient[]) {
    const notes = uniqBy(
      [...this.notes.slice(), ...entries],
      entry => entry.id,
    );
    this.notes = orderBy(notes, entry => entry.updatedAt, ['desc']);
  }

  public subscribeToNote(id: string, callback: (note: NoteClient) => void) {
    return firestore
      .collection(collection.NOTES)
      .doc(id)
      .onSnapshot(async noteDoc => {
        const note = transformSnapToNote(noteDoc);
        callback(note);
        this.notes.forEach((entry, index) => {
          if (entry.id === note.id) {
            this.notes[index] = { ...this.notes[index], ...note };
          }
        });
      });
  }

  public subscribeToUserAccount(
    id: string,
    callback: (user: UserAccountClient) => void,
  ) {
    return firestore
      .collection(collection.USERS)
      .doc(id)
      .onSnapshot(async userAccountDoc => {
        const userAccount = userAccountDoc.exists
          ? transformSnapToUserAccount(userAccountDoc)
          : transformServerUserAccountToClient(id, DEFAULT_USER_ACCOUNT);
        callback(userAccount);
        this.notes.forEach((entry, index) => {
          if (entry.ownerId === id) {
            this.notes[index].user = userAccount;
          }
        });
      });
  }
}

export default NotesStore;
