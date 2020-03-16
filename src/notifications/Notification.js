// @flow

export default class Notification {
  #name: string;
  #target: any;
  #handler: function;

  constructor(pTarget: any, pName: string, pHandler: function) {
    this.#name = pName;
    this.#handler = pHandler;
    this.#target = pTarget;
  }

  get name(): string {
    return this.#name;
  }

  get handler(): function {
    return this.#handler;
  }

  get target(): any {
    return this.#target;
  }
}
