import { computed, observable } from 'mobx';
import config from 'react-native-config';
import firebase from 'react-native-firebase';
import { collection } from '../constants';
import { IUserAccount } from '../types';
import { BaseStore } from './BaseStore';

const firestore = firebase.firestore();

export const DEFAULT_USER_ACCOUNT: IUserAccount = {
  id: 'DEFAULT_USER_ID',
  createdAt: '',
  updatedAt: '',
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

export const createUser = (id: string, data: IUserAccount) => ({
  ...data,
  id,
  updatedAt: firebase.database.ServerValue.TIMESTAMP,
  createdAt: firebase.database.ServerValue.TIMESTAMP,
});

class UserAccountStore extends BaseStore {
  @observable private _userAccount!: IUserAccount;

  @computed
  get userAccount(): IUserAccount {
    return this._userAccount;
  }

  set userAccount(userAccount: IUserAccount) {
    this._userAccount = userAccount;
  }

  public loadUserAccount = async () => {
    const { user } = this.stores.authStore;
    if (!user) {
      return;
    }
    const { uid } = user;
    const docRef = firestore.collection(collection.USERS).doc(uid);
    docRef.onSnapshot(async snap => {
      if (snap.exists) {
        this.userAccount = snap.data() as IUserAccount;
      } else {
        const newUserAccount = createUser(uid, DEFAULT_USER_ACCOUNT);
        await docRef.set(newUserAccount);
        const userAccountSnapshot = await docRef.get();
        this.userAccount = userAccountSnapshot.data() as IUserAccount;
      }
    });
  };
}

export default UserAccountStore;
