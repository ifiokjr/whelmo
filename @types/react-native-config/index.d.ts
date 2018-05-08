/**
 * This is a managed configuration with all the configuration variables available.
 */

declare module 'react-native-config' {
  interface Config {
    readonly CODEPUSH_IOS: string;
    readonly DEFAULT_PROFILE_IMAGE_100: string;
    readonly DEFAULT_PROFILE_IMAGE_640: string;
  }

  const config: Config;
  export default config;
}
