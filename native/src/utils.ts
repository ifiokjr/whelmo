import { NavigationState } from 'react-navigation';

/**
 * Allows us to check the current route name from the navigation state.
 * @param navigationState
 */
export const getCurrentRouteName = (
  navigationState: NavigationState,
): string => {
  if (
    !navigationState ||
    !navigationState.routes ||
    !navigationState.routes.length
  ) {
    return '';
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
};

// tslint:disable-next-line:no-empty
export const noop = () => {};
