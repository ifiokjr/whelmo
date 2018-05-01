import { action, observable } from 'mobx';
import firebase, { RNFirebase } from 'react-native-firebase';
import { collection } from '../constants';
import { RootStoreInterface, UserStoreInterface } from '../types';
import { noop } from '../utils';

const auth = firebase.auth();
const firestore = firebase.firestore();

class UserStore implements UserStoreInterface {
  public stores: RootStoreInterface;
  @observable public user = auth.currentUser;
  @observable public loading = false;
  @observable public profile: object = {};

  constructor(stores: RootStoreInterface) {
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

  @action
  public setProfile(data: object) {
    this.profile = data;
  }

  public signOut = async () => {
    await auth.signOut();
  };

  public signInAnonymously = async () => {
    await auth.signInAnonymouslyAndRetrieveData();
  };

  public loadProfile = async () => {
    if (!this.user) {
      return;
    }
    const { uid } = this.user;
    const docRef = firestore.collection(collection.USERS).doc(uid);
    docRef.onSnapshot(async snap => {
      if (snap.exists) {
        this.setProfile(snap.data() || {});
      } else {
        docRef.set({});
        this.setProfile({});
      }
    });
  };
}

export default UserStore;
