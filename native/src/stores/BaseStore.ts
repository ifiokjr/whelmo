import { IRootStore } from '../types';

export class BaseStore {
  public stores: IRootStore;

  constructor(stores: IRootStore) {
    this.stores = stores;
  }
}
