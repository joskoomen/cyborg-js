import { NotificationRegistration } from '../notifications/NotificationRegistration';
import { NotificationController } from '../notifications/NotificationController';
import { IAmComponent } from '../interfaces/IAmComponent';
import type { ComponentMap } from './ComponentMap';
declare interface ComponentConstructor {
    new (): IAmComponent;
}
export declare class MotherBoard {
    static _instance: MotherBoard;
    componentsMap: Array<ComponentMap>;
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
    static getComponentMapByName(pArray: Array<ComponentMap>, pName: string): ComponentConstructor | null;
    /**
     * destroy application
     */
    destroy(): void;
}
export {};
