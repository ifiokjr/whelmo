import { Omit } from '../general';
import { BaseModelClient, BaseModelServer } from './base';

export type NotificationTypes = 'email' | 'sms' | 'push';

export interface NotificationSetting {
  notificationType: NotificationTypes;
  description: string; // 'follow-received', 'like-received', 'comment-replied'
  active: boolean; // if true then it's active if false then it should be ignored.
}

export interface Name {
  first: string;
  last: string;
  display: string;
}

export interface UserAccountServer extends BaseModelServer {
  username: string;
  name: Name;
  followers: string[];
  following: string[];
  followerCount: number;
  followingCount: number;
  about: string;
  verified: boolean;
  notificationSettings: NotificationSetting[];
  notificationTokens: string[]; // Currently every device they accept notifications.
  image: {
    url: string;
    preview: string;
  };
}
export interface UserAccountClient
  extends Omit<UserAccountServer, keyof BaseModelServer>,
    BaseModelClient {}
