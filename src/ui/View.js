// @flow

import CyborgElement from './CyborgElement';

export default class View {

  #virtualEl: CyborgElement;

  bind(pEl: HTMLElement): void {
    this.#virtualEl = new CyborgElement(pEl);
    this.name = pEl.dataset.view;
  };

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
    super.destroy();
  }
}
