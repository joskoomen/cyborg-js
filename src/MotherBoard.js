// @flow
import NotificationController from './notifications/NotificationController';
import EventNames from './events/EventNames';

/**
 * Motherboard
 */
export default class MotherBoard {

  static #instance: MotherBoard;

  components: Array<any>;

  componentsMap: Object;

  constructor() {
    if (MotherBoard.#instance) {
      throw new Error('Use MotherBoard.getInstance()');
    }
    MotherBoard.#instance = this;
    this.components = [];
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

    window.onbeforeunload = function() {
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

  /**
   * Window onload handler
   */
  onload(): void {
    this.components.forEach((pComponent: any) => {
      pComponent.onload();
    });
  }

  build(pEl: HTMLElement): void {
    const components: NodeList<HTMLElement> = pEl.querySelectorAll('[data-component]');
    if (components.length > 0) {
      const self: MotherBoard = this;
      components.forEach((el: HTMLElement) => {
        const ComponentClass: any = self.getComponentByName(self.componentsMap, el.dataset.component);
        if (ComponentClass) {
          const component: any = new ComponentClass();

          self.registerNotifcation({
            name: el.dataset.component,
            notifications: el.dataset.notifications,
            classRef: component
          });

          component.bind(el);
          self.components.push(component);

          component.addEventListener(EventNames.NODE_REMOVED, function() {
            component.destroy();
          }, false);
        }
      });
    }
  }

  /**
   * Register Notifications.
   */
  registerNotifcation(pObject: Object): void {
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

  /**
   */
  getComponentByName(pObject: Object, pName: string): any {
    return pObject[pName];
  }

  /**
   * destroy application
   * @private
   */
  destroy(): void {
    const self = this;
    while (self.components.length > 0) {
      const component: Component = self.components[0];
      if (component) {
        component.el.remove();
        //        component.destroy();
      }
      self.component.shift();
    }
  }

}
