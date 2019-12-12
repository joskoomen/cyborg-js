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

  attr(pName: string, pValue: string): void {
    this.#virtualEl.setAttribute(pName, pValue);
  }

  text(pValue: string): void {
    this.#virtualEl.setText(pValue, false);
  }

  html(pValue: string): void {
    this.#virtualEl.setText(pValue, true);
  }

  destroy(): void {
    this.#virtualEl = undefined;
    this.notifications = undefined;
    super.destroy();
  }
}
