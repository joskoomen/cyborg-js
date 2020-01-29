// @flow

import CyborgElement from './CyborgElement';

export default class View {
  #virtualEl: CyborgElement;
  notifications: $ReadOnlyArray<string> = [];

  bind(pEl: HTMLElement): void {
    this.#virtualEl = new CyborgElement(pEl);
    this.name = pEl.dataset.view;
  };

  handleNotifications(pData: Object): void {}

  getAttribute(pName: string): Attr {
    this.#virtualEl.getAttribute(pName);
  }

  setAttribute(pName: string, pValue: string): void {
    this.#virtualEl.setAttribute(pName, pValue);
  }

  removeAttribute(pName: string): void {
    this.#virtualEl.removeAttribute(pName);
  }

  enable(): void {
    this.#virtualEl.enable();
  }

  disable(): void {
    this.#virtualEl.disable();
  }

  addClass(pName: string): void {
    this.#virtualEl.addClass(pName);
  }

  toggleClass(pName: string): void {
    this.#virtualEl.toggleClass(pName);
  }

  removeClass(pName: string): void {
    this.#virtualEl.removeClass(pName);
  }

  text(pValue: string): void {
    this.#virtualEl.setText(pValue, false);
  }

  html(pValue: string): void {
    this.#virtualEl.setText(pValue, true);
  }

  destroy(): void {
    this.#virtualEl.destroy();
    this.notifications = undefined;
  }
}
