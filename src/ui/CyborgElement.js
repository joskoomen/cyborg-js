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

  removeAttribute(pName: string): void {
    this.#el.attributes.removeNamedItem(pName);
  }

  enable(): void {
    this.#el.disabled = false;
  }

  disable(): void {
    this.#el.disabled = true;
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

  toggleClass(pName: string): void {
    if (this.#el.classList.contains(pName)) {
      this.#el.classList.remove(pName);
    } else {
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
