import ICanHandleNotifications from "../interfaces/ICanHandleNotifications";

export type NotificationRegistration = {
    name: string;
    notifications: ReadonlyArray<string>;
    classRef: ICanHandleNotifications;
}
