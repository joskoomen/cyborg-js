// @flow

import MotherBoard from './MotherBoard';
import { cyborgEval } from '../functions/cyborgEval';
import { walkDom } from '../functions/walkDom';

export default class Component {
  name: string;
  notifications: $ReadOnlyArray<string> = [];

  #el: HTMLElement;
  #events: Array<Object>;
  #motherboard: MotherBoard;
  #addEventListener: function;
  #removeEventListener: function;

  constructor() {
    this.#events = [];
    this.#motherboard = MotherBoard.getInstance();
    this.#addEventListener = (pTarget: HTMLElement, pEventName: string, pHandler: function) => {
      const handler: function = pHandler.bind(this);
      this.#events.push({target: pTarget, name: pEventName, handler: handler});
      return handler;
    };

    this.#removeEventListener = (pTarget: HTMLElement, pEventName: string, pHandler: function) => {
      const index: number = this.#events.findIndex((evtObj: Object) => {
        return (evtObj.name === pEventName) && (evtObj.handler === pHandler);
      });
      this.#events.splice(index, 1);
      return pTarget;
    };
  }

  /**
   * Bind your component in the system.
   * @param {HTMLElement} pEl Connected Node
   */
  bind(pEl: HTMLElement): void {
    this.#el = pEl;
    this.name = pEl.dataset.component;
    this.registerInlineListeners();
  };

  onload(): void {
    // window.onload trigger for component.
  }

  onunload(): void {
    // window.onunload trigger for component.
  }

  addListener(pType: string) {
    this.motherboard.notifier.addListener(this, pType, this.handleNotifications);
  }

  removeListener(pType: string): void {
    this.motherboard.notifier.removeListener(pType, this);
  }

  notify(pType: string, pParams: Object = {}) {
    this.motherboard.notifier.notify(pType, pParams);
  }

  handleNotifications(pData: Object): void {}

  registerInlineListeners(): void {
    walkDom(this.#el, (pEl: HTMLElement) => {
      if (pEl.dataset.component) {
        return;
      }
      Array.from(pEl.attributes).forEach((pAttribute: Attr) => {
          if (!pAttribute.name.startsWith('on')) return;
          pEl.dataset[pAttribute.name] = pAttribute.value;
          let event: string = pAttribute.name.replace('on', '');
          pEl.removeAttribute(pAttribute.name);
          const isFunction: boolean = (pAttribute.value.indexOf('(') > -1) && (pAttribute.value.indexOf(')') > -1);

          if (isFunction) {
            const handler: function = this.#addEventListener(pEl, event, new Function(`this.${pAttribute.value}`).bind(this));
            pEl.addEventListener(event, handler);
          }
          else {
            const handler: function = this.#addEventListener(pEl, event, () => {
              console.log('handler inline', cyborgEval(this.#motherboard.data, pAttribute.value));
            });
            pEl.addEventListener(event, handler);
          }
        }
      );
    });
  }

  addEventListener(pEventName: string, pHandler: function): void {
    const handler: function = this.#addEventListener(this.#el, pEventName, pHandler);
    this.#el.addEventListener(pEventName, handler, false);
  }

  removeEventListener(pEventName: string, pHandler: function): void {
    this.#removeEventListener(this.#el, pEventName, pHandler);
    this.#el.removeEventListener(pEventName, pHandler);
  }

  /**
   * @param {Object} pData Data object to use
   * @param {function} pTemplate template function
   */
  render(pData: Object, pTemplate?: function): void {
    if (this.#el.children) {
      while (this.#el.children.length > 0) {
        this.#el.children[0].remove();
      }
    }

    if (pTemplate) {
      this.#el.innerHTML = pTemplate(pData);
    }
    else {
      this.#el.innerHTML = this.getTemplate(pData);
    }
    this.motherboard.build(this.#el);
  }

  /**
   * @param {Object} pData
   * @returns {string}
   */
  getTemplate(pData: Object): string {
    return '';
  }

  get el(): HTMLElement {
    return this.#el;
  }

  get motherboard(): MotherBoard {
    return this.#motherboard;
  }

  get events(): $ReadOnlyArray<Object> {
    return this.#events;
  }

  /**
   * Garbage collection ;)
   */
  destroy(): void {
    this.motherboard.notifier.removeAllListenersFor(this);
    while (this.#events.length > 0) {
      let event: Object = this.#events[0];
      this.#removeEventListener(event.target, event.name, event.handler);
      event.target.removeEventListener(event.name, event.handler);
      event = undefined;
    }
    this.#events = undefined;
    this.#el.remove();
    this.#el = undefined;
    this.notifications = undefined;
  }
}
