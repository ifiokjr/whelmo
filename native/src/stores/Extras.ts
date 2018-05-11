import { IExtras, NoteClient } from '../types';
import { BaseStore } from './BaseStore';
import NoteStore from './NoteStore';

class Extras extends BaseStore implements IExtras {
  public async initAfterAuth() {
    try {
      await this.stores.userAccountStore.loadUserAccount();
      await this.stores.notesStore.init();
      await this.stores.userNotesStore.init();
    } catch (e) {}
  }

  public createNote = () => {
    return new NoteStore(this.stores);
  };

  public editNote = (note: NoteClient) => {
    return new NoteStore(this.stores, note);
  };
}

export default Extras;
