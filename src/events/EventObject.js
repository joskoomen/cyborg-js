// @flow

export default class EventObject {
  #name: string;
  #handler: function;

  constructor(pName: string, pHandler: function) {
    this.#name = pName;
    this.#handler = pHandler;
  }

  get name(): string {
    return this.#name;
  }

  get handler(): function {
    return this.#handler;
  }
}
