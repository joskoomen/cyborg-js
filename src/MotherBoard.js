// @flow

import NotificationController from './NotificationController';
import EventNames from './EventNames';

/**
 * Motherboard
 */
export default class MotherBoard {
  static #instance: MotherBoard;

  componentsMap: Object = {};
  #components: Array<any>;

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
    this.build(window.document);

    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (html) {
      html.classList.remove('no-js');
      html.classList.add('js');
    }
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

            if (window.MutationObserver) {
              let observer: MutationObserver = new MutationObserver((mutations: Array<MutationRecord>) => {
                mutations.forEach((mutation: MutationRecord) => {
                  mutation.removedNodes.forEach((removedNode: Node) => {
                    if (component && (removedNode === el)) {
                      component.destroy();
                      observer.disconnect();
                      observer = undefined;
                      component = undefined;
                      el = undefined;
                    }
                  });
                });
              });
              observer.observe(document, {
                childList: true,
                subtree: true
              });
            } else {
              component.addEventListener(EventNames.NODE_REMOVED, function() {
                component.destroy();
                component = undefined;
                el = undefined;
              }, false);
            }
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
}
