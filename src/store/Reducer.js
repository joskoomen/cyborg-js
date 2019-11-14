// @flow

import MotherBoard from '../MotherBoard';
import Component from '../components/Component';

export default class Reducer {
  #motherboard: MotherBoard;
  #registrations: Object;

  constructor() {
    this.#registrations = {};
  }

  /**
   * Bind your reducer in the system.
   * @param {Object} pType
   */
  bind(pType: string): void {
    this.#motherboard = MotherBoard.getInstance();
    this.#motherboard.notifier.addListener(this, pType, this.handleNotifications);
  };

  /**
   * @param {Object} pData Notification Data Object
   */
  handleNotifications(pData: Object): void {}

  register(pName: string, pComponent: Component): void {
    this.#registrations[pName] = pComponent;
  }

  unregister(pName: string): void {
    this.#registrations[pName] = undefined;
  }

  get registrations(): Set {
    return this.#registrations;
  }

  /**
   * Garbage collection ;)
   */
  destroy(): void {
    this.#motherboard.notifier.removeAllListenersFor(this);
    this.#registrations = undefined;
  }
}
