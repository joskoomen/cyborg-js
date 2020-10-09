import { NotificationRegistration } from '../notifications/NotificationRegistration';
import NotificationController from '../notifications/NotificationController';
import IAmComponent from '../interfaces/IAmComponent';
declare interface ComponentConstructor {
    new (): IAmComponent;
}
export default class MotherBoard {
    static _instance: MotherBoard;
    componentsMap: Record<string, any>;
    private _components;
    private _data;
    constructor();
    static getInstance(): MotherBoard;
    /**
     * Init Application.
     */
    init(): void;
    /**
     * Document ready handler
     */
    bind(): void;
    build(pEl: HTMLElement): void;
    /**
     * Window onload handler
     */
    onload(): void;
    onunload(): void;
    destroyComponentListener(pComponent: IAmComponent, pEl: HTMLElement): void;
    registerNotification(pObject: NotificationRegistration): void;
    /**
     * Get NotificationController access.
     * @returns {NotificationController}
     */
    get notifier(): NotificationController;
    get data(): Record<string, any>;
    get components(): ReadonlyArray<IAmComponent>;
    /**
     */
    static getMappedObjectByName(pObject: Record<string, any>, pName: string): ComponentConstructor;
    /**
     * destroy application
     */
    destroy(): void;
}
export {};
