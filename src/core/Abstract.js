// @flow

import MotherBoard from '../MotherBoard';

export default class Abstract {
  name: string;

  handleNotifications(pData: Object): void {}

  addListener(pType: string) {
    this.motherboard.notifier.addListener(this, pType, this.handleNotifications);
  }

  removeListener(pType: string): void {
    this.motherboard.notifier.removeListener(pType, this);
  }

  notify(pType: string, pParams: Object = {}) {
    this.motherboard.notifier.notify(pType, pParams);
  }

  get motherboard(): MotherBoard {
    return MotherBoard.getInstance();
  }

  /**
   * Garbage collection ;)
   */
  destroy(): void {
    this.motherboard.notifier.removeAllListenersFor(this);
  }
}
