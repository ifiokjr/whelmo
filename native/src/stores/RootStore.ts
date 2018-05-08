import { IRootStore } from '../types';
import AuthStore from './AuthStore';
import NotesStore from './NotesStore';
import UserAccountStore from './UserAccountStore';

class RootStore implements IRootStore {
  public authStore: AuthStore;
  public userAccountStore: UserAccountStore;
  public notesStore: NotesStore;
  public userNotesStore: NotesStore;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userAccountStore = new UserAccountStore(this);
    this.notesStore = new NotesStore(this, 'all');
    this.userNotesStore = new NotesStore(this, 'user');
  }

  public async initAfterAuth() {
    try {
      await this.userAccountStore.loadUserAccount();
      await this.notesStore.init();
      await this.userNotesStore.init();
    } catch (e) {}
  }
}

export default RootStore;
