import base64 from 'base-64';
import { Dimensions, Platform, PlatformIOSStatic } from 'react-native';
import RNFetch from 'react-native-fetch-blob';
import { NavigationState } from 'react-navigation';

const { width, height } = Dimensions.get('window');

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

export const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative';

export const isElectron =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0;

export const isWeb = !isElectron && !isReactNative;

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isIPhoneX =
  Platform.OS === 'ios' &&
  !(Platform as PlatformIOSStatic).isPad &&
  !(Platform as PlatformIOSStatic).isTVOS &&
  (height === 812 || width === 812);

/**
 * btoa and atob exist in the browser but do not exist globally in react-native.
 * This bug is hard to spot since when debugging, the btoa function is available (as well as in jest tests).
 *
 * We simply fall back to using the base64 encoding library
 */
export const btoa: (rawString: string) => string = base64.encode;
export const atob: (encodedString: string) => string = base64.decode;

const BASE_DIR = `${RNFetch.fs.dirs.CacheDir}whelmo-cache/`;

/**
 * Downloads and caches any public image by it's url.
 *
 * Returns the local uri
 */
export async function downloadAndCacheImage(url: string): Promise<string> {
  const filename = url.substring(
    url.lastIndexOf('/'),
    url.indexOf('?') === -1 ? url.length : url.indexOf('?'),
  );
  const ext =
    filename.indexOf('.') === -1
      ? '.jpg'
      : filename.substring(filename.lastIndexOf('.'));
  try {
    const res = await RNFetch.config({
      fileCache: true,
      appendExt: ext,
    }).fetch('GET', url, {});
    // console.log(BASE_DIR, url, res.path());
    return isIOS ? res.path() : `file://${res.path()}`;
  } catch (e) {
    return '';
  }
}

/**
 * Generates a responsive height in pixels from provided percentage.
 *
 * @param {Number} percent - percentage of device height
 * @return {Number}
 */
export const responsiveHeight = (percent?: number) => {
  if (percent === 100 || !isFinite(percent) || !percent) {
    return height;
  }
  return Math.round(height * (percent / 100));
};

/**
 * Generates a responsive width in pixels from provided percentage.
 *
 * @param {Number} w - percentage of device width
 * @return {Number}
 */
export const responsiveWidth = (percent?: number) => {
  if (percent === 100 || !isFinite(percent) || !percent) {
    return width;
  }
  return Math.round(width * (percent / 100));
};
