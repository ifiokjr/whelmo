import { default as AuthStore } from './AuthStore';
import { default as NotesStore } from './NotesStore';
import { default as NoteStore } from './NoteStore';
import { default as RootStore } from './RootStore';
import { default as UserAccountStore } from './UserAccountStore';

const stores = new RootStore();

export default stores;
export { AuthStore, RootStore, UserAccountStore, NotesStore, NoteStore };
