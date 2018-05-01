import { RootStoreInterface } from '../types';
import UserStore from './UserStore';

class RootStore implements RootStoreInterface {
  public userStore: UserStore;

  constructor() {
    this.userStore = new UserStore(this);
  }
}

export default RootStore;
