import { computed, observable } from 'mobx';
import config from 'react-native-config';
import firebase from 'react-native-firebase';
import { collection } from '../constants';
import { UserAccountClient, UserAccountServer } from '../types';
import { BaseStore } from './BaseStore';
import { createServerUserAccount } from './helpers';

const firestore = firebase.firestore();

export const DEFAULT_USER_ACCOUNT: UserAccountServer = {
  username: '',
  name: {
    first: 'J',
    last: 'Edgar',
    display: 'Hoover',
  },
  followers: [],
  following: [],
  followerCount: 0,
  followingCount: 0,
  about: '',
  verified: false,
  notificationSettings: [],
  notificationTokens: [],
  image: {
    url:
      config.DEFAULT_PROFILE_IMAGE_100 ||
      'https://firebasestorage.googleapis.com/v0/b/whelmodev.appspot.com/o/public-images%2Favatar-1577909_100.png?alt=media&token=9ace29c6-c78b-44ed-a558-fdc3050c94af',
    preview:
      'data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
  },
};

class UserAccountStore extends BaseStore {
  @observable private _userAccount!: UserAccountClient;

  @computed
  get userAccount(): UserAccountClient {
    return this._userAccount;
  }

  set userAccount(userAccount: UserAccountClient) {
    this._userAccount = userAccount;
  }

  public loadUserAccount = async () => {
    const { user } = this.stores.authStore;
    if (!user) {
      return;
    }
    const { uid } = user;
    const docRef = firestore.collection(collection.USERS).doc(uid);
    docRef.onSnapshot(async userAccountSnap => {
      if (userAccountSnap.exists) {
        this.userAccount = userAccountSnap.data() as UserAccountClient;
      } else {
        const newUserAccount = createServerUserAccount(DEFAULT_USER_ACCOUNT);
        await docRef.set(newUserAccount);
        const userAccountSnapshot = await docRef.get();
        this.userAccount = userAccountSnapshot.data() as UserAccountClient;
      }
    });
  };
}

export default UserAccountStore;
