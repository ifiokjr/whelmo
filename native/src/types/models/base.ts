import { RNFirebase } from 'react-native-firebase';

export interface BaseModelClient {
  id: string;
  createdAt: Date | number | string;
  updatedAt: Date | number | string;
}

export interface BaseModelServer {
  createdAt?: RNFirebase.firestore.FieldValue;
  updatedAt?: RNFirebase.firestore.FieldValue;
}
