// @flow

import cloneDeep from 'lodash.clonedeep';
import isEqual from 'lodash.isequal';

export default class CyborgElement {

  #virtual: HTMLElement;
  #el: HTMLElement;

  constructor(pEl: HTMLElement) {
    this.#el = pEl;
    this.#virtual = cloneDeep(pEl);
    console.log('this.#el', this.#el);
    console.log('this.#virtual', this.#virtual);
  }

  setAttribute(pName: string, pValue: string): void {
    const attr: Attr = this.#virtual.attributes.getNamedItem(pName);
    attr.value = pValue;
    this.render();
  }

  setText(pValue: string, pHTML: boolean = false): void {
    if (pHTML) {
      this.#virtual.innerHTML = pValue;
    }
    this.#virtual.innerText = pValue;
    this.render();
  }

  render(): void {
    if (!isEqual(this.#virtual, this.#el)) {
      console.log('not equal');
      this.#el = this.#virtual;
      console.log('after this.#el', this.#el);
      console.log('after this.#virtual', this.#virtual);
      console.log('after equal? ', isEqual(this.#virtual, this.#el));
    }
  }

  get data(): Object {
    return this.#virtual;
  }

  destroy(): void {
    this.#virtual = undefined;
    this.#el = undefined;
  }
}
