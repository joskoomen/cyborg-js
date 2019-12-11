// @flow

import View from './View';

export default class ViewController {
  static #instance: ViewController;

  #views: Array<View>;

  constructor() {
    if (ViewController.#instance) {
      throw new Error('Use ViewController.getInstance()');
    }
    ViewController.#instance = this;
    this.#views = [];
  }

  static getInstance(): ViewController {
    if (ViewController.#instance) {
      return ViewController.#instance;
    }
    return new ViewController();
  }

  bind(pViews: NodeList<HTMLElement>, pMap: Object): void {
    const self: ViewController = this;
    pViews.forEach((el: HTMLElement) => {
      const ViewClass: any = pMap[el.dataset.view];
      if (ViewClass) {
        const view: View = new ViewClass();
        view.bind(el);
        self.#views.push(view);
      }
    });
  }

  destroy(): void {
    const self: ViewController = this;
    while (self.#views.length > 0) {
      const view: View = self.#views[0];
      if (view) {
        view.destroy();
      }
      self.#views.shift();
    }
  }
}
