import { Notification } from './Notification';
import { IAmComponent } from '../interfaces/IAmComponent';
import { ICanHandleNotifications } from '../interfaces/ICanHandleNotifications';
export declare class NotificationController {
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
    removeAllListenersFor(pInstance: IAmComponent): void;
    get listeners(): Array<Notification>;
}
