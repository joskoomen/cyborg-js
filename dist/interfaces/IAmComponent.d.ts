import { ICanBind } from './ICanBind';
import { ICanDestroy } from './ICanDestroy';
import { ICanHandleNotifications } from './ICanHandleNotifications';
import { ICanHandleEvents } from './ICanHandleEvents';
import { ICanNotify } from './ICanNotify';
export interface IAmComponent extends ICanBind, ICanDestroy, ICanHandleNotifications, ICanNotify, ICanHandleEvents {
    bind(pEl: HTMLElement): void;
    onload(): void;
    onunload(): void;
    readonly el: HTMLElement | undefined;
    notifications: ReadonlyArray<string> | undefined;
}
