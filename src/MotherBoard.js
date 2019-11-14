// @flow
import EventNames from './events/EventNames';

export default class MotherBoard {
  static #instance: MotherBoard;

  #components: Array<any>;
  #store: any;
  #componentsMap: Object;

  constructor() {
    if (MotherBoard.#instance) {
      throw new Error('Use MotherBoard.getInstance()');
    }
    MotherBoard.#instance = this;
    this.#components = [];
    this.#componentsMap = {};
  }

  static getInstance(): MotherBoard {
    if (MotherBoard.#instance) {
      return MotherBoard.#instance;
    }
    return new MotherBoard();
  }

  /**
   * Init Application.
   * @param pComponentsMap
   * @param pStore
   */
  init(pComponentsMap: Object, pStore?: any): void {
    const self: MotherBoard = this;

    this.#componentsMap = pComponentsMap;

    if (pStore) {
      self.#store = pStore;
    }

    window.onload = function() {
      self.onload();
    };

    window.onbeforeunload = function() {
      self.destroy();
    };

    document.addEventListener(EventNames.DOCUMENT_READY, () => {
      self.bind();
    }, false);
  }

  build(pEl: HTMLElement): void {
    const components: NodeList<HTMLElement> = pEl.querySelectorAll('[data-component]');
    if (components.length > 0) {
      const self: MotherBoard = this;
      components.forEach((el: HTMLElement) => {
        const componentsArray: Array<string> = el.dataset.component.split(' ').join('').split(',');
        componentsArray.forEach((componentString: string) => {
          const ComponentClass: any = MotherBoard.getComponentByName(self.#componentsMap, componentString);
          if (ComponentClass) {
            let component: Component = new ComponentClass();

            if (self.#store) {
              component.props = self.store.getState();
            } else {
              component.props = null;
            }
            component.bind(el);
            self.#components.push(component);

            let observer: MutationObserver = new MutationObserver((pMutations: Array<MutationRecord>) => {
              pMutations.forEach((pMutation: MutationRecord) => {
                pMutation.removedNodes.forEach((pRemovedNode: Node) => {
                  if (component && (pRemovedNode === el)) {
                    component.destroy();
                    observer.disconnect();
                    observer = undefined;
                    el = undefined;
                    component = undefined;
                  }
                });
              });
            });

            observer.observe(document, {
              childList: true,
              subtree: true
            });
          }
        });
      });
    }
  }

  get store(): any {
    return this.#store;
  }

  get components(): Array<any> {
    return this.#components;
  }

  /**
   * @private
   * Document ready handler
   */
  bind(): void {
    this.build(window.document);

    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (html) {
      html.classList.remove('no-js');
      html.classList.add('js');
    }
  }

  /**
   * @private
   * Window onload handler
   */
  onload(): void {
    this.#components.forEach((pComponent: any) => {
      pComponent.onload();
    });
  }

  /**
   * @private
   */
  static getComponentByName(pObject: Object, pName: string): any {
    return pObject[pName];
  }

  /**
   * @private
   * destroy application
   */
  destroy(): void {
    const self = this;
    while (self.#components.length > 0) {
      const component: Component = self.#components[0];
      if (component) {
        component.el.remove();
      }
      self.#components.shift();
    }
  }
}
