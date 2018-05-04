import { ActionTypes } from '../actions';

export interface Action {
  type: ActionTypes;
  /**
   * Is the action still active.
   */
  active: boolean;
}
