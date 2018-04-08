import { Dimensions, Platform, PlatformIOSStatic } from 'react-native';

export const isReactNative =
  typeof navigator === 'object' && navigator.product === 'ReactNative';

export const isElectron =
  typeof navigator === 'object' &&
  typeof navigator.userAgent === 'string' &&
  navigator.userAgent.indexOf('Electron') >= 0;

export const isWeb = !isElectron && !isReactNative;

const { width, height } = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isIPhoneX =
  Platform.OS === 'ios' &&
  !(Platform as PlatformIOSStatic).isPad &&
  !(Platform as PlatformIOSStatic).isTVOS &&
  (height === 812 || width === 812);
