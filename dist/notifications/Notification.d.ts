import IAmComponent from "../interfaces/IAmComponent";
export declare class Notification {
    readonly name: string;
    readonly target: IAmComponent;
    readonly handler: Function;
    constructor(pTarget: IAmComponent, pName: string, pHandler: Function);
}
