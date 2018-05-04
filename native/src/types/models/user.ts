export type NotificationTypes = 'email' | 'sms' | 'push';

export interface NotificationSetting {
  notificationType: NotificationTypes;
  description: string; // 'follow-received', 'like-received', 'comment-replied'
  active: boolean; // if true then it's active if false then it should be ignored.
}

export interface Name {
  firstName: string;
  lastName: string;
  displayName: string;
}

export interface Settings {
  username: string;
  name: Name;
  followers: string[];
  about: string;
  verified: boolean;
  notificationSettings: NotificationSetting[];
  notificationTokens: string[]; // Currently every device they accept notifications.
}
