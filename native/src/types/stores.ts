import { RNFirebase } from 'react-native-firebase';

export interface RootStoreInterface {
  userStore: UserStoreInterface;
}

export type UserType = RNFirebase.User | null;

export interface UserStoreInterface {
  stores: RootStoreInterface;
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
