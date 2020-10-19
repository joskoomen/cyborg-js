import { NotificationBody } from "../notifications/NotificationBody";
export interface ICanHandleNotifications {
    name: string;
    handleNotifications(pObject: NotificationBody): void;
    addListener(pType: string): void;
    removeListener(pType: string): void;
}
