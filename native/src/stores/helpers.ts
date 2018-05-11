import firebase, { RNFirebase } from 'react-native-firebase';
import {
  ActionClient,
  NoteClient,
  NoteServer,
  UserAccountClient,
  UserAccountServer,
} from '../types';

export const transformSnapToNote = (
  noteSnap: RNFirebase.firestore.DocumentSnapshot,
): NoteClient => {
  return { ...(noteSnap.data() as NoteClient), id: noteSnap.id as string };
};

export const transformSnapToUserAccount = (
  userAccountSnap: RNFirebase.firestore.DocumentSnapshot,
): UserAccountClient => {
  return {
    ...(userAccountSnap.data() as UserAccountClient),
    id: userAccountSnap.id as string,
  };
};

export const transformSnapToAction = (
  actionSnap: RNFirebase.firestore.DocumentSnapshot,
): ActionClient => {
  return {
    ...(actionSnap.data() as ActionClient),
    id: actionSnap.id as string,
  };
};

export const createServerUserAccount = (
  data: UserAccountServer,
): UserAccountServer => {
  const dataCopy = { ...data };
  Reflect.deleteProperty(dataCopy, 'id');
  return {
    ...dataCopy,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

export const transformServerUserAccountToClient = (
  id: string,
  data: UserAccountServer,
): UserAccountClient => ({
  ...data,
  id,
  updatedAt: Date.now(),
  createdAt: Date.now(),
});

export const createNoteByUser = (ownerId: string, note: NoteServer) => {
  return {
    ...note,
    ownerId,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
};

export const transformServerNoteToClient = (
  id: string,
  data: NoteServer,
): NoteClient => ({
  ...data,
  id,
  updatedAt: Date.now(),
  createdAt: Date.now(),
});
