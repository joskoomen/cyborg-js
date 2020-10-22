import { ICanHandleNotifications } from '../interfaces/ICanHandleNotifications';
export declare class Notification {
    readonly name: string;
    readonly target: ICanHandleNotifications;
    readonly handler: Function;
    constructor(pTarget: ICanHandleNotifications, pName: string, pHandler: Function);
}
