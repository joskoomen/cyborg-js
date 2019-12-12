// @flow

import NotificationController from '../notifications/NotificationController';

/**
 * Register Notifications.
 */
export function registerNotification(pObject: Object): void {
  if (pObject.notifications) {
    const notifications: $ReadOnlyArray<string> = pObject.notifications;
    const classRef: Component = pObject.classRef;
    notifications.forEach((pNotification: string) => {
      NotificationController.getInstance().addListener(classRef, pNotification, classRef.handleNotifications);
    });
  }
}
