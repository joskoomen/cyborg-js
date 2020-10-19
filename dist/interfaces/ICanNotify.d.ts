export interface ICanNotify {
    notify(pType: string, pParams?: Record<string, any>): void;
}
