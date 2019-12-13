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

  addClass(pName: string): void {
    if (!this.#el.classList.contains(pName)) {
      this.#el.classList.add(pName);
    }
  }

  removeClass(pName: string): void {
    if (this.#el.classList.contains(pName)) {
      this.#el.classList.remove(pName);
    }
  }

  destroy(): void {
    this.#el = undefined;
  }
}
