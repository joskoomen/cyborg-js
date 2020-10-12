import ICanHandleNotifications from '../interfaces/ICanHandleNotifications';
import { NotificationRegistration } from '../notifications/NotificationRegistration';
import EventNames from '../constants/EventNames';
import NotificationController from '../notifications/NotificationController';
import IAmComponent from '../interfaces/IAmComponent';

declare interface ComponentConstructor {
  new (): IAmComponent;
}

declare const componentsMapping: Map<string, ComponentConstructor>;

export default class MotherBoard {
  static _instance: MotherBoard;

  public componentsMap: Record<string, IAmComponent> = {};
  private _components: Array<IAmComponent> = [];
  private _data: Record<string, any> = {};

  constructor() {
    if (MotherBoard._instance) {
      throw new Error('Use MotherBoard.getInstance()');
    }
    MotherBoard._instance = this;
    this.init();
  }

  static getInstance(): MotherBoard {
    if (MotherBoard._instance) {
      return MotherBoard._instance;
    }
    return new MotherBoard();
  }

  /**
   * Init Application.
   */
  init(): void {
    window.onload = (): void => {
      this.onload();
    };

    window.onunload = (): void => {
      this.onunload();
    };

    window.onpagehide = (): void => {
      this.destroy();
    };

    document.addEventListener(
      EventNames.DOCUMENT_READY,
      (): void => {
        this.bind();
      },
      false
    );
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
    const componentsList: Array<HTMLElement> = Array.from(
      pEl.querySelectorAll('[data-component]')
    );
    if (componentsList.length > 0) {
      componentsList.forEach((el: HTMLElement) => {
        const dataset: DOMStringMap = el.dataset;
        if (dataset && dataset.component) {
          const componentsArray: Array<string> = dataset.component
            .replace(' ', '')
            .split(',');
          componentsArray.forEach((componentString: string) => {
            const ComponentClass: ComponentConstructor = MotherBoard.getMappedObjectByName(
              this.componentsMap,
              componentString
            );
            if (ComponentClass) {
              const component: IAmComponent = new ComponentClass();
              if (
                component.notifications &&
                component.notifications.length > 0
              ) {
                this.registerNotification({
                  name: componentString,
                  notifications: component.notifications,
                  classRef: component,
                });
              }

              component.bind(el);
              this._components.push(component);
              this.destroyComponentListener(component, el);
            }
          });
        }
      });
    }
  }

  /**
   * Window onload handler
   */
  onload(): void {
    this._components.forEach((pComponent: IAmComponent) => {
      pComponent.onload();
    });
  }

  onunload(): void {
    this._components.forEach((pComponent: IAmComponent) => {
      pComponent.onunload();
    });
  }

  destroyComponentListener(pComponent: IAmComponent, pEl: HTMLElement): void {
    let component: IAmComponent | null = pComponent;
    let el: HTMLElement | null = pEl;
    if (el) {
      if (window.MutationObserver) {
        let observer: MutationObserver | null = new MutationObserver(
          (mutations: Array<MutationRecord>) => {
            mutations.forEach((mutation: MutationRecord) => {
              mutation.removedNodes.forEach((removedNode: Node) => {
                if (component && removedNode === pEl) {
                  component.destroy();
                  if (observer) {
                    observer.disconnect();
                    observer = null;
                  }
                  component = null;
                  el = null;
                }
              });
            });
          }
        );
        observer.observe(document, {
          childList: true,
          subtree: true,
        });
      } else {
        pComponent.addEventListener(EventNames.NODE_REMOVED, function() {
          pComponent.destroy();
          component = null;
          el = null;
        });
      }
    }
  }

  registerNotification(pObject: NotificationRegistration): void {
    if (pObject.notifications) {
      const notifications: ReadonlyArray<string> = pObject.notifications;
      const classRef: ICanHandleNotifications = pObject.classRef;
      notifications.forEach((pNotification: string) => {
        this.notifier.addNotificationListener(
          classRef,
          pNotification,
          // eslint-disable-next-line @typescript-eslint/unbound-method
          classRef.handleNotifications
        );
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

  get data(): Record<string, any> {
    return this._data;
  }

  get components(): ReadonlyArray<IAmComponent> {
    return this._components;
  }

  /**
   */
  static getMappedObjectByName(
    pObject: Record<string, any>,
    pName: string
  ): ComponentConstructor {
    return pObject[pName];
  }

  /**
   * destroy application
   */
  destroy(): void {
    while (this._components.length > 0) {
      const component: IAmComponent = this._components[0];
      if (component && component.el) {
        component.el.remove();
      }
      this._components.shift();
    }
  }
}
