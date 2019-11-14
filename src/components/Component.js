// @flow

import EventObject from '../events/EventObject';
import MotherBoard from '../MotherBoard';

export default class Component {
  #el: HTMLElement;
  #events: Array<EventObject>;
  #motherboard: MotherBoard;


  /**
   * Bind your component in the system.
   * @param {HTMLElement} pEl Connected Node
   */
  bind(pEl: HTMLElement): void {
    this.#el = pEl;
    this.name = pEl.dataset.component;
    //
    this.#events = [];
    this.#motherboard = MotherBoard.getInstance();
  };

  onload(): void {
    // window.onload trigger for component.
  }

  /**
   * @param {Object} pData Notification Data Object
   */
  handleNotifications(pData: Object): void {}

  addEventListener(pEventName: string, pHandler: function): void {
    this.#events.push(new EventObject(pEventName, pHandler));
    this.el.addEventListener(pEventName, pHandler, false);
  }

  removeEventListener(pEventName: string, pHandler: function): void {
    const index: number = this.#events.findIndex((evtObj: EventObject) => {
      return (evtObj.name === pEventName) && (evtObj.handler === pHandler);
    });
    this.#events.splice(index, 1);
    this.el.removeEventListener(pEventName, pHandler);
  }

  /**
   * @param {string} pType Notification name
   */
  addListener(pType: string) {
    this.#motherboard.notifier.addListener(this, pType, this.handleNotifications);
  }

  /**
   * @param {string} pType Notification name
   */
  removeListener(pType: string): void {
    this.#motherboard.notifier.removeListener(pType, this);
  }

  /**
   *
   * @param {string} pType Notification name
   * @param {Object} [pParams={}] Data Object to send
   */
  notify(pType: string, pParams: Object = {}) {
    this.#motherboard.notifier.notify(pType, pParams);
  }

  /**
   * @param {Object} pData Data object to use
   */
  render(pData: Object): void {
    if (this.el.children) {
      while (this.el.children.length > 0) {
        this.el.children[0].remove();
      }
    }
    this.el.innerHTML = this.getTemplate(pData);
    this.#motherboard.bind(this.el);
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

  get events(): Array<EventObject> {
    return this.#events;
  }

  /**
   * Garbage collection ;)
   */
  destroy(): void {
    while (this.#events.length > 0) {
      this.removeEventListener(this.#events[0].name, this.#events[0].handler);
    }
    this.#motherboard.notifier.removeAllListenersFor(this);

    this.#el = undefined;
    this.#events = undefined;
    this.#motherboard = undefined;
  }
}
