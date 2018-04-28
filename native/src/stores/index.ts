import { default as UserStore } from './UserStore';

class RootStore {
  public userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
  }
}

const stores = new RootStore();

export default stores;
export { UserStore };
