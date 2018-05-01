export type NotificationTypes = 'email' | 'sms' | 'push';

export interface NotificationSetting {
  notificationType: NotificationTypes;
  description: string; // 'follow-received', 'like-received', 'comment-replied'
  active: boolean; // if true then it's active if false then it should be ignored.
}

export interface Settings {
  notificationSettings: NotificationSetting[];
  notificationTokens: string[]; // Currently every device they accept notifications.
}
