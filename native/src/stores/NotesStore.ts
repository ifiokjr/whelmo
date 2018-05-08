import { first, last, orderBy, uniq, uniqBy } from 'lodash';
import { action, computed, observable } from 'mobx';
import firebase, { RNFirebase } from 'react-native-firebase';
import { collection } from '../constants';
import { INote, INotePopulated, IRootStore, IUserAccount } from '../types';
import { BaseStore } from './BaseStore';
import { DEFAULT_USER_ACCOUNT } from './UserAccountStore';

type QueryIdentifier = 'user' | 'all';
const DEFAULT_PAGE_SIZE = 5;

interface IUserAccountObject {
  [uid: string]: IUserAccount;
}

const firestore = firebase.firestore();

class NotesStore extends BaseStore {
  private queryIdentifier: QueryIdentifier;
  private query!: RNFirebase.firestore.Query;

  private cursor?: RNFirebase.firestore.DocumentSnapshot;
  private lastKnownEntry?: RNFirebase.firestore.DocumentSnapshot;

  @observable private _notes: INotePopulated[] = [];
  @observable public loading = false;
  public userAccounts: IUserAccountObject = {};
  @computed
  get notes(): INotePopulated[] {
    return this._notes;
  }
  set notes(notes: INotePopulated[]) {
    this._notes = notes;
  }

  constructor(stores: IRootStore, queryIdentifier: QueryIdentifier) {
    super(stores);
    this.queryIdentifier = queryIdentifier;
  }

  private setQuery = () => {
    if (this.queryIdentifier === 'user') {
      this.query = firestore
        .collection(collection.NOTES)
        .where('uid', '==', this.stores.authStore.user)
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

  public async joinProfiles(notes: INote[]): Promise<INotePopulated[]> {
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
          this.userAccounts[uid] = userAccountDoc.data() as IUserAccount;
        } catch (e) {
          this.userAccounts[uid] = DEFAULT_USER_ACCOUNT;
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
      const notes: INote[] = [];
      snap.forEach(noteDoc => {
        notes.push(this.tranformSnapToNote(noteDoc));
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
    const notes: INote[] = [];
    snap.forEach(noteDoc => {
      notes.push(this.tranformSnapToNote(noteDoc));
    });
    const notesFeed = await this.joinProfiles(notes);
    if (!this.notes) {
      this.notes = [];
      this.lastKnownEntry = snap.docs[0];
    }
    this.addToFeed(notesFeed);
    this.cursor = last(snap.docs);
    this.setLoading(false);
  }

  public addToFeed(entries: INotePopulated[]) {
    const notes = uniqBy(
      [...this.notes.slice(), ...entries],
      entry => entry.id,
    );
    this.notes = orderBy(notes, entry => entry.updatedAt, ['desc']);
  }

  private tranformSnapToNote(
    noteDoc: RNFirebase.firestore.DocumentSnapshot,
  ): INote {
    return { ...(noteDoc.data() as INote), id: noteDoc.id as string };
  }

  private tranformSnapToUserAccount(
    userAccountDoc: RNFirebase.firestore.DocumentSnapshot,
  ): IUserAccount {
    return {
      ...(userAccountDoc.data() as IUserAccount),
      id: userAccountDoc.id as string,
    };
  }

  public subscribeToNote(id: string, callback: (note: INote) => void) {
    return firestore
      .collection(collection.NOTES)
      .doc(id)
      .onSnapshot(async noteDoc => {
        const note = this.tranformSnapToNote(noteDoc);
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
    callback: (user: IUserAccount) => void,
  ) {
    return firestore
      .collection(collection.USERS)
      .doc(id)
      .onSnapshot(async userAccountDoc => {
        const userAccount = userAccountDoc.exists
          ? this.tranformSnapToUserAccount(userAccountDoc)
          : DEFAULT_USER_ACCOUNT;
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
