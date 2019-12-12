// @flow

export default class CyborgElement {
  #el: HTMLElement;

  constructor(pEl: HTMLElement) {
    this.#el = pEl;
  }

  setAttribute(pName: string, pValue: string): void {
    const attr: Attr = this.#el.attributes.getNamedItem(pName);
    attr.value = pValue;
  }

  setText(pValue: string, pHTML: boolean = false): void {
    if (pHTML) {
      this.#el.innerHTML = pValue;
    } else {
      this.#el.innerText = pValue;
    }
  }

  destroy(): void {
    this.#el = undefined;
  }
}
