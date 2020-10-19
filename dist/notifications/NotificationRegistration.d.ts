import { ICanHandleNotifications } from "../interfaces/ICanHandleNotifications";
export declare type NotificationRegistration = {
    name: string;
    notifications: ReadonlyArray<string>;
    classRef: ICanHandleNotifications;
};
