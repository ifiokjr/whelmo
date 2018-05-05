import { IRootStore } from '../types';
import AuthStore from './AuthStore';

class RootStore implements IRootStore {
  public authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export default RootStore;
