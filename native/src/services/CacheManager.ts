// @flow
import SHA1 from 'crypto-js/sha1';
import { uniqueId } from 'lodash';
import FetchBlob from 'react-native-fetch-blob';

const { fs: FileSystem } = FetchBlob;

const BASE_DIR = `${FileSystem.dirs.CacheDir}whelmo-image-cache/`;

interface ICacheEntry {
  uri: string;
  path: string;
  canceled: boolean;
  getPath(): Promise<string>;
  cancel(): Promise<void>;
}

export class CacheEntry implements ICacheEntry {
  public uri: string;
  public path: string = '';
  public canceled: boolean = false;

  constructor(uri: string) {
    this.uri = uri;
  }

  public async getPath(): Promise<string> {
    const { path, exists, tmpPath } = await getCacheEntry(this.uri);
    if (exists) {
      return path;
    }
    this.canceled = false;
    await FileSystem.downloadAsync(this.uri, tmpPath);
    await FileSystem.moveAsync({ from: tmpPath, to: path });
    if (!this.canceled) {
      return path;
    }
    return '';
  }

  public async cancel(): Promise<void> {
    this.canceled = true;
  }
}

interface ICacheEntries {
  [uri: string]: CacheEntry;
}

// tslint:disable-next-line:max-classes-per-file
export default class CacheManager {
  public static entries: ICacheEntries = {};

  public static get(uri: string): CacheEntry {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri);
    }
    return CacheManager.entries[uri];
  }

  public static async clearCache(): Promise<void> {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true });
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  }
}

const getCacheEntry = async (
  uri: string,
): Promise<{ exists: boolean; path: string; tmpPath: string }> => {
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?'),
  );
  const ext =
    filename.indexOf('.') === -1
      ? '.jpg'
      : filename.substring(filename.lastIndexOf('.'));
  const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
  const tmpPath = `${BASE_DIR}${SHA1(uri)}-${uniqueId()}${ext}`;
  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR);
  } catch (e) {
    // do nothing
  }
  const info = await FileSystem.getInfoAsync(path);
  const { exists } = info;
  return { exists, path, tmpPath };
};
