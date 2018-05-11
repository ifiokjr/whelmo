import { action, observable } from 'mobx';
import firebase, { RNFirebase } from 'react-native-firebase';
import { IAuthStore, IRootStore } from '../types';
import { noop } from '../utils';
import { BaseStore } from './BaseStore';

const auth = firebase.auth();

class AuthStore extends BaseStore implements IAuthStore {
  @observable public user = auth.currentUser;
  @observable public loading = false;

  constructor(stores: IRootStore) {
    super(stores);
    this.stores = stores;
  }

  public stopListeningForUserChanges: () => void = noop;
  public stopListeningForAuthChanges: () => void = noop;

  @action
  public listenForAuthChanges() {
    this.setLoading(true);
    this.stopListeningForAuthChanges = auth.onAuthStateChanged(this.updateUser);
  }

  @action
  public listenForUserChanges() {
    this.stopListeningForAuthChanges(); // Prevent double events being fired
    this.stopListeningForUserChanges = auth.onUserChanged(this.updateUser);
  }

  @action
  public updateUser = (user: RNFirebase.User | null) => {
    this.user = user;
    this.setLoading(false);
  };

  @action
  public setLoading = (loading: boolean = true) => {
    this.loading = loading;
  };

  public signOut = async () => {
    await auth.signOut();
  };

  public signInAnonymously = async () => {
    await auth.signInAnonymouslyAndRetrieveData();
  };
}

export default AuthStore;
