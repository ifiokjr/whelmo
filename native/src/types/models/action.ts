import { ActionTypes } from '../actions';
import { ITimeStamp } from './base';

export interface Action extends ITimeStamp {
  id: string;
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
