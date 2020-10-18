import Notification from "./Notification";
import type {NotificationBody} from "./NotificationBody";
import IAmComponent from "../interfaces/IAmComponent";

export default class NotificationController {
    static _instance: NotificationController;

    private _listeners: Array<Notification>;

    constructor() {
        if (NotificationController._instance) {
            throw new Error('Use NotificationController.getInstance()');
        }
        NotificationController._instance = this;
        this._listeners = [];
    }

    static getInstance(): NotificationController {
        if (NotificationController._instance) {
            return NotificationController._instance;
        }
        return new NotificationController();
    }

    /**
     * emit a notification
     * @param pType
     * @param pParams
     */
    notify(pType: string, pParams?: Record<string, any>): void {
        const listeners: ReadonlyArray<Notification> = this._listeners;
        const notes: ReadonlyArray<Notification> = listeners.filter((listener: Notification) => {
            return listener.name === pType;
        });

        notes.forEach((note: Notification) => {
            const body: NotificationBody = {notification: pType, payload: pParams || {}};
            note.handler(body);
        });
    }

    /**
     * Add a Notification Listener
     * @param pTarget
     * @param pType
     * @param pHandler
     */
    addNotificationListener(pTarget: IAmComponent, pType: string, pHandler: Function): void {
        const note: Notification = new Notification(pTarget, pType, pHandler.bind(pTarget));
        this._listeners.push(note);
    }

    /**
     * Remove a given listener. This only removes one record.
     * @param pType string Notification name
     * @param pTarget Component object
     */
    removeNotificationListener(pType: string, pTarget: any): void {
        const listeners: Array<Notification> = this._listeners;
        const index: number = listeners.findIndex((notification: Notification): boolean => {
            return (notification.name === pType) && (notification.target === pTarget);
        });
        this._listeners = listeners.splice(index, 1);
    }

    removeAllListenersFor(pInstance: IAmComponent): void {
        const listeners: Array<Notification> = this._listeners;
        this._listeners = listeners.filter((notification: Notification): boolean => {
            return (notification.target.name !== pInstance.name);
        });
    }

    get listeners(): Array<Notification> {
        return this._listeners;
    }
}
