// @flow

import { Component } from '../ui/Component';

export default class Notification {
  #name: string;
  #target: Component;
  #handler: function;

  constructor(pTarget: Component, pName: string, pHandler: function) {
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

  get target(): Component {
    return this.#target;
  }
}
