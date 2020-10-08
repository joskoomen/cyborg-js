import { Notification } from "./Notification";
import ICanHandleNotifications from "../interfaces/ICanHandleNotifications";
import ICanNotify from "../interfaces/ICanNotify";
export default class NotificationController implements ICanNotify {
    static _instance: NotificationController;
    private _listeners;
    constructor();
    static getInstance(): NotificationController;
    /**
     * emit a notification
     * @param pType
     * @param pParams
     */
    notify(pType: string, pParams?: Record<string, any>): void;
    /**
     * Add a Notification Listener
     * @param pTarget
     * @param pType
     * @param pHandler
     */
    addNotificationListener(pTarget: ICanHandleNotifications, pType: string, pHandler: Function): void;
    /**
     * Remove a given listener. This only removes one record.
     * @param pType string Notification name
     * @param pTarget Component object
     */
    removeNotificationListener(pType: string, pTarget: any): void;
    removeAllListenersFor(pInstance: ICanHandleNotifications): void;
    get listeners(): Array<Notification>;
}
