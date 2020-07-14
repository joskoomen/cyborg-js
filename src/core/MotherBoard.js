// @flow

import NotificationController from '../notifications/NotificationController';
import EventNames from '../constants/EventNames';

/**
 * Motherboard
 */
export default class MotherBoard {
  static #instance: MotherBoard;

  componentsMap: Object = {};
  #components: Array<any>;
  #data: Object = {};

  constructor() {
    if (MotherBoard.#instance) {
      throw new Error('Use MotherBoard.getInstance()');
    }
    MotherBoard.#instance = this;
    this.#components = [];
    this.init();
  }

  static getInstance(): MotherBoard {
    if (MotherBoard.#instance) {
      return MotherBoard.#instance;
    }
    return new MotherBoard();
  }

  /**
   * Init Application.
   */
  init(): void {
    const self: MotherBoard = this;
    window.onload = function() {
      self.onload();
    };

    window.onunload = function() {
      self.onunload();
    };

    window.onpagehide = function() {
      self.destroy();
    };

    document.addEventListener(EventNames.DOCUMENT_READY, () => {
      self.bind();
    }, false);
  }

  /**
   * Document ready handler
   */
  bind(): void {
    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (!html) {
      throw Error('No html tag available');
    }

    html.classList.remove('no-js');
    html.classList.add('js');
    this.build(html);
  }

  build(pEl: HTMLElement): void {
    const components: NodeList<HTMLElement> = pEl.querySelectorAll('[data-component]');
    const self: MotherBoard = this;
    if (components.length > 0) {
      components.forEach((el: HTMLElement) => {
        const componentsArray: Array<string> = el.dataset.component.split(' ').join('').split(',');
        componentsArray.forEach((componentString: string) => {
          const ComponentClass: Component = MotherBoard.getMappedObjectByName(self.componentsMap, componentString);
          if (ComponentClass) {
            let component: Component = new ComponentClass();

            if (component.notifications && component.notifications.length > 0) {
              this.registerNotification({
                name: componentString,
                notifications: component.notifications,
                classRef: component
              });
            }

            component.bind(el);
            self.#components.push(component);
            self.destroyComponentListener(component, el);
          }
        });
      });
    }
  }

  /**
   * Window onload handler
   */
  onload(): void {
    this.#components.forEach((pComponent: Component) => {
      pComponent.onload();
    });
  }

  onunload(): void {
    this.#components.forEach((pComponent: Component) => {
      pComponent.onunload();
    });
  }

  destroyComponentListener(pComponent: any, pEl: HTMLElement): void {
    if (window.MutationObserver) {
      let observer: MutationObserver = new MutationObserver((mutations: Array<MutationRecord>) => {
        mutations.forEach((mutation: MutationRecord) => {
          mutation.removedNodes.forEach((removedNode: Node) => {
            if (pComponent && (removedNode === pEl)) {
              pComponent.destroy();
              observer.disconnect();
              observer = undefined;
              pComponent = undefined;
              pEl = undefined;
            }
          });
        });
      });
      observer.observe(document, {
        childList: true,
        subtree: true
      });
    }
    else {
      pComponent.addEventListener(EventNames.NODE_REMOVED, function() {
        pComponent.destroy();
        pComponent = undefined;
        pEl = undefined;
      }, false);
    }
  }

  registerNotification(pObject: Object): void {
    if (pObject.notifications) {
      const notifications: $ReadOnlyArray<string> = pObject.notifications;
      const classRef: Component = pObject.classRef;
      notifications.forEach((pNotification: string) => {
        this.notifier.addListener(classRef, pNotification, classRef.handleNotifications);
      });
    }
  }

  /**
   * Get NotificationController access.
   * @returns {NotificationController}
   */
  get notifier(): NotificationController {
    return NotificationController.getInstance();
  }

  get data(): Object {
    return this.#data;
  }

  get components(): $ReadOnlyArray<any> {
    return this.#components;
  }

  /**
   */
  static getMappedObjectByName(pObject: Object, pName: string): any {
    return pObject[pName];
  }

  /**
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
    self.componentsMap = undefined;
  }

  static hanleDirectives(pEl: HTMLElement) {
    if (pEl.dataset.text) {
      const expression: any = pEl.dataset.text;
      pEl.innerText = MotherBoard.getInstance().data[expression];
    }
    if (pEl.dataset.html) {
      const expression: any = pEl.dataset.html;
      pEl.innerHtml = MotherBoard.getInstance().data[expression];
    }
  }

}
