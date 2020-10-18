import IAmComponent from "../interfaces/IAmComponent";

export default class Notification {
    readonly name: string;
    readonly target: IAmComponent;
    readonly handler: Function;

    constructor(pTarget: IAmComponent, pName: string, pHandler: Function) {
        this.name = pName;
        this.handler = pHandler;
        this.target = pTarget;
    }
}
