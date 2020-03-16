// @flow

import MotherBoard from './MotherBoard';

class RenderObject {
  #data: Object;
  #template: function;

  constructor(pData: Object, pTemplate?: function) {
    this.#data = pData;
    this.#template = pTemplate;
  }

  get data(): Object {
    return this.#data;
  }

  get template(): function {
    return this.#template;
  }
}

class Component {
  name: string;
  notifications: $ReadOnlyArray<string> = [];

  #el: HTMLElement;
  #events: Array<Object>;
  #motherboard: MotherBoard;

  /**
   * Bind your component in the system.
   * @param {HTMLElement} pEl Connected Node
   */
  bind(pEl: HTMLElement): void {
    this.#el = pEl;
    this.name = pEl.dataset.component;
    this.#events = [];
    this.#motherboard = MotherBoard.getInstance();
  };

  onload(): void {
    // window.onload trigger for component.
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

  addEventListener(pEventName: string, pHandler: function): void {
    const handler: function = pHandler.bind(this);
    this.#events.push({ name: pEventName, handler: handler });
    this.el.addEventListener(pEventName, handler, false);
  }

  removeEventListener(pEventName: string, pHandler: function): void {
    const index: number = this.#events.findIndex((evtObj: Object) => {
      return (evtObj.name === pEventName) && (evtObj.handler === pHandler);
    });
    this.#events.splice(index, 1);
    this.el.removeEventListener(pEventName, pHandler);
  }

  /**
   * @param {RenderObject} pData Data object to use
   */
  render(pData: RenderObject): void {
    if (this.el.children) {
      while (this.el.children.length > 0) {
        this.el.children[0].remove();
      }
    }

    if (pData.template) {
      this.el.innerHTML = pData.template(pData.data);
    } else {
      this.el.innerHTML = this.getTemplate(pData.data);
    }
    this.motherboard.build(this.el);
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
      this.removeEventListener(this.#events[0].name, this.#events[0].handler);
    }
    this.#events = undefined;
    this.#el.remove();
    this.#el = undefined;
    this.notifications = undefined;
  }
}

export {
  RenderObject,
  Component
};
