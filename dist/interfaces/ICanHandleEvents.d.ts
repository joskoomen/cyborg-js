export default interface ICanHandleEvents {
    addEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
    removeEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
}
