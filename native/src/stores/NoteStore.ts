import { action, observable, runInAction } from 'mobx';
import firebase, { RNFirebase } from 'react-native-firebase';
import { collection } from '../constants';
import { INoteStore, IRootStore, NoteClient, NoteServer } from '../types';
import { BaseStore } from './BaseStore';
import {
  createNoteByUser,
  transformServerNoteToClient,
  transformSnapToNote,
} from './helpers';

const firestore = firebase.firestore();
/** Manages the creation of new notes and updates of existing notes */

export const NEW_NOTE: NoteServer = {
  message: '',
  title: '',
  attachedTo: '',
  ownerId: '',
  status: 'draft',
};

class NoteStore extends BaseStore implements INoteStore {
  @observable public note!: NoteClient;
  @observable public loading = true;
  public id: string = '';
  public noteDoc?: RNFirebase.firestore.DocumentReference;
  private collection = firestore.collection(collection.NOTES);

  constructor(rootStore: IRootStore, note?: NoteClient) {
    super(rootStore);
    if (note) {
      this.id = note.id;
      this.note = note;
      this.retrieveNoteDocument().catch();
    } else {
      this.createNote().catch();
    }
  }

  // TODO: seem to be a few roundrips to the server here before caching the note
  @action
  public async createNote() {
    const { user } = this.stores.authStore;
    if (user) {
      const noteDoc = this.collection.doc();
      this.noteDoc = noteDoc;
      this.id = noteDoc.id as string;
      const noteServer = createNoteByUser(user.uid, NEW_NOTE);
      try {
        await noteDoc.set(noteServer);
        runInAction(() => {
          this.note = transformServerNoteToClient(this.id, noteServer);
          this.loading = false;
        });
      } catch (e) {}
    }
  }

  @action
  public async retrieveNoteDocument() {
    try {
      this.noteDoc = await this.collection.doc(this.id);
      const noteSnap = await this.noteDoc.get();
      runInAction(() => {
        this.note = transformSnapToNote(noteSnap);
        this.loading = false;
      });
    } catch (e) {
      // Do something soon
    }
  }

  @action
  public updateNote = async (note: Partial<NoteClient>) => {
    if (!this.noteDoc) {
      return;
    }
    this.loading = true;
    await this.noteDoc.update(transformUpdateNoteForServer(note));
    runInAction(() => {
      this.note = { ...this.note, ...note };
      this.loading = false;
    });
  };
}

const transformUpdateNoteForServer = (note: Partial<NoteClient>) => {
  const noteCopy = { ...note };
  Reflect.deleteProperty(noteCopy, 'id');
  delete noteCopy.id;
  return {
    ...noteCopy,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

export default NoteStore;
