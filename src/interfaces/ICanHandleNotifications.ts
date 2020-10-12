import {NotificationBody} from "../notifications/NotificationBody";

export default interface ICanHandleNotifications {

    handleNotifications(pObject: NotificationBody): void;

    addListener(pType: string): void;

    removeListener(pType: string): void;
}
