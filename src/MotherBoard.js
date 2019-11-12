// @flow
import NotificationController from './notifications/NotificationController';
import EventNames from './events/EventNames';

/**
 * Motherboard
 */
export default class MotherBoard {

  #components: Array<any>;

  constructor() {
    this.#components = [];
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
    const components: NodeList<HTMLElement> = pEl.querySelectorAll('[data-component]');
    if (components.length > 0) {
      const self: MotherBoard = this;

      components.forEach((el: HTMLElement) => {
        const componentsArray: Array<string> = el.dataset.component.split(' ').join('').split(',');
        componentsArray.forEach((componentString: string) => {
          const ComponentClass: any = self.getComponentByName(pComponentsMap, componentString);
          if (ComponentClass) {
            let component: any = new ComponentClass();
            component.init(this);

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
   * Window onload handler
   */
  onload(): void {
    this.#components.forEach((pComponent: any) => {
      pComponent.onload();
    });
  }

  /**
   * Register Notifications.
   */
  registerNotification(pObject: Object): void {
    if (pObject.notifications) {
      const notifications: Array<string> = pObject.notifications.replace(' ', '').split(',');
      const classRef: Component = pObject.classRef;
      const self: MotherBoard = this;
      notifications.forEach((pNotification: string) => {
        self.notifier.addListener(classRef, pNotification, classRef.handleNotifications);
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
    self.#components = undefined;
  }
}
