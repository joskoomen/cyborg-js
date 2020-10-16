import { NotificationBody } from '../notifications/NotificationBody';

export default interface IAmComponent {
  notifications: ReadonlyArray<string>;
  el: HTMLElement | undefined;
  name: string;
  
  bind(pEl: HTMLElement): void;
  onload(): void;
  onunload(): void;
  destroy(): void;
  notify(pType: string, pParams?: Record<string, any>): void;
  handleNotifications(pObject: NotificationBody): void;
  addListener(pType: string): void;
  removeListener(pType: string): void;
  addEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
  removeEventListener(pEventName: string, pHandler: EventListenerOrEventListenerObject): void;
}
