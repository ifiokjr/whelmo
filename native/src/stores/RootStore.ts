import remoteDev from 'mobx-remotedev';
import { IRootStore } from '../types';
import AuthStore from './AuthStore';
import Extras from './Extras';
import NotesStore from './NotesStore';
import UserAccountStore from './UserAccountStore';

@remoteDev({
  name: 'RootStore',
  remote: false,
})
class RootStore implements IRootStore {
  public authStore: AuthStore;
  public userAccountStore: UserAccountStore;
  public notesStore: NotesStore;
  public userNotesStore: NotesStore;
  public extras: Extras;

  constructor() {
    this.authStore = new AuthStore(this);
    this.userAccountStore = new UserAccountStore(this);
    this.notesStore = new NotesStore(this, 'all');
    this.userNotesStore = new NotesStore(this, 'user');
    this.extras = new Extras(this);
  }
}

export default RootStore;
