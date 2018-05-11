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
  private stopListening?: () => void;
  private stopListeningForNewNotes?: () => void;
  private stopListeningForOldNotes?: () => void;

  private cursor?: RNFirebase.firestore.DocumentSnapshot;
  private newNotesCursor?: RNFirebase.firestore.DocumentSnapshot;
  private oldNotesCursor?: RNFirebase.firestore.DocumentSnapshot;
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
    // console.log('the user is', user);
    if (this.queryIdentifier === 'user' && user) {
      this.query = firestore
        .collection(collection.NOTES)
        .where('ownerId', '==', user.uid)
        .orderBy('createdAt', 'desc');
    } else {
      this.query = firestore
        .collection(collection.NOTES)
        .orderBy('createdAt', 'desc');
    }
  };

  @action
  private setLoading = (status: boolean) => {
    this.loading = status;
  };

  public async init() {
    this.setQuery();
    await this.loadNewNotes();
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
          const userAccountSnap = await firestore
            .collection(collection.USERS)
            .doc(uid)
            .get();
          this.userAccounts[uid] = transformSnapToUserAccount(userAccountSnap);
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

  private handleNewNotesSnap = async (
    snap: RNFirebase.firestore.QuerySnapshot,
  ) => {
    const notes: NoteClient[] = [];
    snap.forEach(noteSnap => {
      notes.push(transformSnapToNote(noteSnap));
    });
    const newNotesFeed = await this.joinProfiles(notes);
    this.newNotesCursor = first(snap.docs);
    this.addToFeed(newNotesFeed, true);
    if (!this.notes.length) {
      this.oldNotesCursor = last(snap.docs);
    }
    this.setLoading(false);
  };

  private listenForNewNotes = async () => {
    let query = this.query;

    if (this.newNotesCursor) {
      query = this.query.endBefore(this.newNotesCursor);
    }
    this.stopListeningForNewNotes = query
      .limit(DEFAULT_PAGE_SIZE)
      .onSnapshot(async snap => {
        if (snap.docs.length === 0) {
          this.setLoading(false);
          return;
        }
        await this.handleNewNotesSnap(snap);
        if (this.stopListeningForNewNotes) {
          this.stopListeningForNewNotes();
          await this.listenForNewNotes();
        }
      });
  };

  public async loadNewNotes(): Promise<void> {
    if (this.stopListeningForNewNotes) {
      this.stopListeningForNewNotes();
    }

    this.setLoading(true);
    await this.listenForNewNotes();
  }

  public async loadOldNotes(): Promise<void> {
    // eslint-disable-next-line prefer-destructuring
    if (this.stopListeningForOldNotes) {
      this.stopListeningForOldNotes();
    }
    this.setLoading(true);
    let query = this.query;
    if (this.oldNotesCursor) {
      query = query.startAfter(this.oldNotesCursor);
    }

    this.stopListeningForOldNotes = await query
      .limit(DEFAULT_PAGE_SIZE)
      .onSnapshot(async snap => {
        if (snap.docs.length === 0) {
          this.setLoading(false);
          return;
        }
        const notes: NoteClient[] = [];
        snap.forEach(noteDoc => {
          notes.push(transformSnapToNote(noteDoc));
        });
        const notesFeed = await this.joinProfiles(notes);
        if (!this.notes.length) {
          this.newNotesCursor = first(snap.docs);
        }
        this.addToFeed(notesFeed);
        this.oldNotesCursor = last(snap.docs);
        this.setLoading(false);
        // stopListening();
      });
  }

  public addToFeed(entries: PopulatedNotedClient[], isNew?: boolean) {
    const arr = isNew
      ? [...entries, ...this.notes]
      : [...this.notes, ...entries];
    const notes = uniqBy(arr, entry => entry.id);
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
