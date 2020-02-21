// @flow
import Notification from './Notification';
import Component from '../ui/Component';
import { ResponseBody } from './ResponseBody';

export default class NotificationController {
  static #instance: NotificationController;

  #listeners: Array<Notification>;

  constructor() {
    if (NotificationController.#instance) {
      throw new Error('Use NotificationController.getInstance()');
    }
    NotificationController.#instance = this;
    this.#listeners = [];
  }

  static getInstance(): NotificationController {
    if (NotificationController.#instance) {
      return NotificationController.#instance;
    }
    return new NotificationController();
  }

  /**
   * emit a notification
   * @param pType
   * @param pParams
   */
  notify(pType: string, pParams: Object = {}): void {
    const listeners: $ReadOnlyArray<Notification> = this.#listeners;
    const notes: $ReadOnlyArray<Notification> = listeners.filter((listener: Notification) => {
      return listener.name === pType;
    });

    notes.forEach((note: Notification) => {
      const body: ResponseBody = {
        notification: pType,
        data: pParams
      };
      note.handler(body);
    });
  }

  /**
   * Add a Notification Listener
   * @param pTarget
   * @param pType
   * @param pHandler
   */
  addListener(pTarget: Component, pType: string, pHandler: function): void {
    const note: Notification = new Notification(pTarget, pType, pHandler.bind(pTarget));
    this.#listeners.push(note);
  }

  /**
   * Remove a given listener. This only removes one record.
   * @param pType string Notification name
   * @param pTarget Component object
   */
  removeListener(pType: string, pTarget: Component): void {
    const listeners: Array<Notification> = this.#listeners;
    const index: number = listeners.findIndex((notification: Notification): boolean => {
      return (notification.name === pType) && (notification.target === pTarget);
    });
    this.#listeners = listeners.splice(index, 1);
  }

  removeAllListenersFor(pInstance: any): void {
    const listeners: Array<Notification> = this.#listeners;
    this.#listeners = listeners.filter((notification: Notification): boolean => {
      return (notification.target.name !== pInstance.name);
    });
  }

  get listeners(): Array<Notification> {
    return this.#listeners;
  }
}
