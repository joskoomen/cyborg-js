import MotherBoard from './MotherBoard';
import IAmComponent from '../interfaces/IAmComponent';
export default class Component implements IAmComponent {
    name: string;
    notifications: ReadonlyArray<string>;
    private _el;
    private _events;
    private _motherboard;
    private _addEventListener;
    private _removeEventListener;
    constructor();
    /**
     * Bind your component in the system.
     * @param {HTMLElement} pEl Connected Node
     */
    bind(pEl: HTMLElement): void;
    onload(): void;
    onunload(): void;
    addListener(pType: string): void;
    removeListener(pType: string): void;
    notify(pType: string, pParams?: Record<string, any>): void;
    handleNotifications(pData: Record<string, any>): string;
    registerInlineListeners(): void;
    addEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
    removeEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
    /**
     * @param {Object} pData Data object to use
     * @param {function} pTemplate template function
     */
    render(pData: Record<string, any>, pTemplate?: Function): void;
    /**
     * @param {Object} pData
     * @returns {string}
     */
    getTemplate(pData?: Record<string, any>): string;
    get el(): HTMLElement | undefined;
    get motherboard(): MotherBoard;
    get events(): ReadonlyArray<Record<string, any>>;
    /**
     * Garbage collection ;)
     */
    destroy(): void;
}
