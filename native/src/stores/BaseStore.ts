import { IBaseStore, IRootStore } from '../types';

export class BaseStore implements IBaseStore {
  public stores: IRootStore;

  constructor(stores: IRootStore) {
    this.stores = stores;
  }
}
