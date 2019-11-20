// @flow

import Abstract from './Abstract';

export default class Modifier extends Abstract {
  #references: Array<any>;

  /**
   * Bind your component in the system.
   */
  bind(pName: string): void {
    this.name = pName;
    this.#references = [];
  };

  render(pData: Object): void {
    // if (this.el.children) {
    //   while (this.el.children.length > 0) {
    //     this.el.children[0].remove();
    //   }
    // }
    // this.el.innerHTML = this.getTemplate(pData);
    // @TODO: referenceces trigger & MotherBoard.getinstance().build??
    // this.#motherboard.build(window.document);
  }

  /**
   * Garbage collection ;)
   */
  destroy(): void {
    super.destroy();
  }
}
