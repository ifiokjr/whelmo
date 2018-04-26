/**
 * This is a managed configuration with all the configuration variables available.
 */

declare module 'react-native-config' {
  interface Config {
    readonly CODEPUSH_IOS: string;
  }

  const config: Config;
  export default config;
}
