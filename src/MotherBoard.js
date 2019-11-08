// @flow
import NotificationController from './notifications/NotificationController';
import EventNames from './events/EventNames';

/**
 * Motherboard
 */
export default class MotherBoard {
  static #instance: MotherBoard;

  #components: Array<any>;

  constructor() {
    if (MotherBoard.#instance) {
      throw new Error('Use MotherBoard.getInstance()');
    }
    MotherBoard.#instance = this;
    this.#components = [];
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
  init(pComponentsMap: Object, pTarget: HTMLElement = window.document): void {
    const self: MotherBoard = this;

    window.onload = function() {
      self.onload();
    };

    window.onbeforeunload = function() {
      self.destroy();
    };

    document.addEventListener(EventNames.DOCUMENT_READY, () => {
      self.bind(pTarget, pComponentsMap);
    }, false);
  }

  /**
   * Document ready handler
   */
  bind(pTarget: HTMLElement, pComponentsMap: Object): void {
    this.build(pTarget, pComponentsMap);

    const html: HTMLHtmlElement | null = document.querySelector('html');
    if (html) {
      html.classList.remove('no-js');
      html.classList.add('js');
    }
  }

  /**
   * Window onload handler
   */
  onload(): void {
    this.#components.forEach((pComponent: any) => {
      pComponent.onload();
    });
  }

  build(pEl: HTMLElement, pComponentsMap: Object): void {
    const components: NodeList<HTMLElement> = pEl.querySelectorAll('[data-component]');
    if (components.length > 0) {
      const self: MotherBoard = this;

      components.forEach((el: HTMLElement) => {
        const componentsArray: Array<string> = el.dataset.component.split(' ').join('').split(',');
        componentsArray.forEach((componentString: string) => {
          const ComponentClass: any = self.getComponentByName(pComponentsMap, componentString);
          if (ComponentClass) {
            let component: any = new ComponentClass();

            self.registerNotification({
              name: componentString,
              notifications: el.dataset.notifications,
              classRef: component
            });

            component.bind(el);
            self.#components.push(component);

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
          }
        });
      });
    }
  }

  /**
   * Register Notifications.
   */
  registerNotification(pObject: Object): void {
    if (pObject.notifications) {
      const notifications: Array<string> = pObject.notifications.replace(' ', '').split(',');
      const classRef: Component = pObject.classRef;
      notifications.forEach((pNotification: string) => {
        NotificationController.getInstance().addListener(classRef, pNotification, classRef.handleNotifications);
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

  get components(): Array<any> {
    return this.#components;
  }

  /**
   */
  getComponentByName(pObject: Object, pName: string): any {
    return pObject[pName];
  }

  /**
   * destroy application
   */
  destroy(): void {
    const self = this;
    const { shift } = self.#components;
    while (self.#components > 0) {
      const component: Component = self.#components[0];
      if (component) {
        component.el.remove();
      }
      shift();
    }

  }
}
