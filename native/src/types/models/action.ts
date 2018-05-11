import { Omit } from '..';
import { ActionTypes } from '../actions';
import { BaseModelClient, BaseModelServer } from './base';

export interface ActionServer extends BaseModelServer {
  type: ActionTypes;
  /**
   * Is the action still active.
   */
  active: boolean;

  /**
   * User creating the action
   */
  uid: string;

  targetId: string;
}

export interface ActionClient
  extends Omit<ActionServer, keyof BaseModelServer>,
    BaseModelClient {}
