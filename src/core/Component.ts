import MotherBoard from './MotherBoard';
import { EventObject } from '../events/EventObject';
import { walkDom } from '../functions/walkDom';
import { cyborgEval } from '../functions/cyborgEval';
import { NotificationBody } from '../notifications/NotificationBody';
import  IAmComponent from '../interfaces/IAmComponent';

export default class Component implements IAmComponent{
  name = '';
  
  private _el: HTMLElement | undefined;
  private _events: Array<EventObject>;
  private _motherboard: MotherBoard;
  private _addEventListener: Function;
  private _removeEventListener: Function;

  constructor() {
    this._motherboard = MotherBoard.getInstance();
    this._events = [];
    this._addEventListener = (
      pTarget: HTMLElement,
      pEventName: string,
      pHandler: Function
    ): Function => {
      const handler: Function = pHandler.bind(this);
      this._events.push({
        target: pTarget,
        name: pEventName,
        handler: handler,
      });
      return handler;
    };

    this._removeEventListener = (
      pTarget: HTMLElement,
      pEventName: string,
      pHandler: Function
    ): HTMLElement => {
      const index: number = this._events.findIndex(
        (evtObj: EventObject) => {
          return (
            evtObj.name === pEventName &&
            evtObj.handler === pHandler
          );
        }
      );
      this._events.splice(index, 1);
      return pTarget;
    };
  }

  /**
  * Bind your component in the system.
  * @param {HTMLElement} pEl Connected Node
  */
  bind(pEl: HTMLElement): void {
    this._el = pEl;
    this.name = pEl.dataset.component || pEl.toString();
    this.registerInlineListeners();
  }

  onload(): void {
    // window.onload trigger for component.
  }

  onunload(): void {
    // window.onunload trigger for component.
  }

  addListener(pType: string): void {
    this.motherboard.notifier.addNotificationListener(
      this,
      pType,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.handleNotifications
    );
  }

  removeListener(pType: string): void {
    this.motherboard.notifier.removeNotificationListener(
      pType,
      this
    );
  }

  notify(
    pType: string,
    pParams: Record<string, any> = {}
  ): void {
    this.motherboard.notifier.notify(pType, pParams);
  }

  handleNotifications(pObject: NotificationBody): void {
    pObject.notification;
  }

  registerInlineListeners(): void {
    if (this._el) {
      walkDom(this._el, (element: HTMLElement) => {
        if (element.dataset.component) {
          return;
        }
        Array.from(element.attributes).forEach(
          (pAttribute: Attr) => {
            if (!pAttribute.name.startsWith('on')) return;
            element.dataset[pAttribute.name] = pAttribute.value;
            const event: string = pAttribute.name.replace(
              'data-on:',
              ''
            );
            element.removeAttribute(pAttribute.name);
            const isFunction: boolean =
              pAttribute.value.includes('(') &&
              pAttribute.value.includes(')');

            if (isFunction) {
              const handler: Function = this._addEventListener(
                element,
                event,
                new Function(`this.${pAttribute.value}`).bind(
                  this
                )
              );
              element.addEventListener(
                event,
                handler as EventListener
              );
            } else {
              const handler: Function = this._addEventListener(
                element,
                event,
                () => {
                  cyborgEval(
                    this._motherboard.data,
                    pAttribute.value
                  );
                }
              );
              element.addEventListener(
                event,
                handler as EventListener
              );
            }
          }
        );
      });
    }
  }

  addEventListener(
    pEventName: string,
    pHandler: EventListenerOrEventListenerObject
  ): void {
    if (this._el) {
      const handler: Function = this._addEventListener(
        this._el,
        pEventName,
        pHandler
      );
      this._el.addEventListener(
        pEventName,
        handler as EventListenerOrEventListenerObject,
        false
      );
    }
  }

  removeEventListener(
    pEventName: string,
    pHandler: EventListenerOrEventListenerObject
  ): void {
    if (this._el) {
      this._removeEventListener(this._el, pEventName, pHandler);
      this._el.removeEventListener(pEventName, pHandler);
    }
  }

  /**
  * @param {Object} pData Data object to use
  * @param {function} pTemplate template function
  */
  render(
    pData: Record<string, any>,
    pTemplate?: Function
  ): void {
    if (this._el) {
      if (this._el.children) {
        while (this._el.children.length > 0) {
          this._el.children[0].remove();
        }
      }

      if (pTemplate) {
        this._el.innerHTML = pTemplate(pData);
      } else {
        this._el.innerHTML = this.getTemplate(pData);
      }
      this.motherboard.build(this._el);
    }
  }

  /**
  * @param {Object} pData
  * @returns {string}
  */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTemplate(pData?: Record<string, any>): string {
    pData = pData || {};
    return '';
  }

  get notifications(): ReadonlyArray<string>  {
    return []; 
  }

  get el(): HTMLElement | undefined {
    return this._el;
  }

  get motherboard(): MotherBoard {
    return this._motherboard;
  }

  get events(): ReadonlyArray<Record<string, any>> {
    return this._events;
  }

  /**
  * Garbage collection ;)
  */
  destroy(): void {
    this.motherboard.notifier.removeAllListenersFor(this);
    while (this._events.length > 0) {
      const event: EventObject = this._events[0];
      this._removeEventListener(
        event.target,
        event.name,
        event.handler
      );
      event.target.removeEventListener(
        event.name,
        event.handler as EventListenerOrEventListenerObject
      );
    }
    if (this._el) {
      this._el.remove();
      this._el = undefined;
    }
  }
}
