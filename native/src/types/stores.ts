import { RNFirebase } from 'react-native-firebase';
import { NoteClient, PopulatedNotedClient, UserAccountClient } from './models';

export interface IRootStore {
  authStore: IAuthStore;
  userAccountStore: IUserAccountStore;
  notesStore: INotesStore;
  userNotesStore: INotesStore;
  extras: IExtras;
}

export type UserType = RNFirebase.User | null;

export interface IBaseStore {
  stores: IRootStore;
}

export interface IAuthStore extends IBaseStore {
  stores: IRootStore;
  user: UserType;
  loading: boolean;
  stopListeningForUserChanges: () => void;
  stopListeningForAuthChanges: () => void;
  listenForAuthChanges(): void;
  listenForUserChanges(): void;
  updateUser(user: UserType): void;
  setLoading(loading?: boolean): void;

  signOut(): Promise<void>;

  signInAnonymously(): Promise<void>;
}

export interface INoteStore extends IBaseStore {
  note: NoteClient;
  loading: boolean;
  // collection: RNFirebase.firestore.CollectionReference;
  id: string;
  noteDoc?: RNFirebase.firestore.DocumentReference;
  updateNote(note: Partial<NoteClient>): Promise<void>;
  createNote(note: NoteClient): Promise<void>;
}

export interface IUserAccountStore extends IBaseStore {
  userAccount: UserAccountClient;
  loadUserAccount(): Promise<void>;
}

export interface UserAccountObject {
  [uid: string]: UserAccountClient;
}

export interface INotesStore extends IBaseStore {
  loading: boolean;
  userAccounts: UserAccountObject;
  notes: PopulatedNotedClient[];
  init(): Promise<void>;
  joinProfiles(notes: NoteClient[]): Promise<PopulatedNotedClient[]>;
  checkForNewEntriesInNotes(): Promise<void>;
  loadNotes(): Promise<void>;
  addToFeed(entries: PopulatedNotedClient[]): void;
  subscribeToNote(id: string, callback: (note: NoteClient) => void): void;
  subscribeToUserAccount(
    id: string,
    callback: (user: UserAccountClient) => void,
  ): () => void;
}

export interface IExtras extends IBaseStore {
  initAfterAuth(): Promise<void>;
  createNote(): INoteStore;
  editNote(note: NoteClient): INoteStore;
}
