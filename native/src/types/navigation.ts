import {
  NavigationAction,
  NavigationDispatch,
  NavigationEventCallback,
  NavigationEventSubscription,
  NavigationNavigateAction,
  NavigationParams,
  NavigationState,
  // NavigationInjectedProps
} from 'react-navigation';
import { NoteClient } from './models';

/**
 * Taken from react-navigation types v1.5.11
 * TODO update to 2.x
 */
export interface GenericNavigationScreenProp<P = NavigationParams> {
  state: NavigationState;
  dispatch: NavigationDispatch;
  goBack: (routeKey?: string | null) => boolean;
  navigate(options: {
    routeName: string;
    params?: P;
    action?: NavigationAction;
    key?: string;
  }): boolean;
  navigate(
    routeNameOrOptions: string,
    params?: P,
    action?: NavigationAction,
  ): boolean;
  getParam: <T extends keyof P>(param: T, fallback?: P[T]) => P[T];
  setParams: (newParams: P) => boolean;
  addListener: (
    eventName: string,
    callback: NavigationEventCallback,
  ) => NavigationEventSubscription;
  push: (
    routeName: string,
    params?: P,
    action?: NavigationNavigateAction,
  ) => boolean;
  replace: (
    routeName: string,
    params?: P,
    action?: NavigationNavigateAction,
  ) => boolean;
  pop: (n?: number, params?: { immediate?: boolean }) => boolean;
  popToTop: (params?: { immediate?: boolean }) => boolean;
  /**
   * @deprecated
   */
  // params: P;
}

/**
 * Add this to your prop type definition for smart type-checking of params.
 */
export interface GenericInjectedNavigationProp<P = NavigationParams> {
  navigation: GenericNavigationScreenProp<P>;
}

export interface EditNoteParams {
  note?: NoteClient;
}
