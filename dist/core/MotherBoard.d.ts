import { NotificationRegistration } from '../notifications/NotificationRegistration';
import NotificationController from '../notifications/NotificationController';
import Component from './Component';
declare interface ComponentConstructor {
    new (): Component;
}
export default class MotherBoard {
    static _instance: MotherBoard;
    componentsMap: Record<string, Component>;
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
    destroyComponentListener(pComponent: Component, pEl: HTMLElement): void;
    registerNotification(pObject: NotificationRegistration): void;
    /**
     * Get NotificationController access.
     * @returns {NotificationController}
     */
    get notifier(): NotificationController;
    get data(): Record<string, any>;
    get components(): ReadonlyArray<Component>;
    /**
     */
    static getMappedObjectByName(pObject: Record<string, any>, pName: string): ComponentConstructor;
    /**
     * destroy application
     */
    destroy(): void;
}
export {};
