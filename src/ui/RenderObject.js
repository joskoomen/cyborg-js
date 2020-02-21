// @flow

export default class RenderObject {
  #data: Object;
  #template: function;

  constructor(pData: Object, pTemplate?: function) {
    this.#data = pData;
    this.#template = pTemplate;
  }

  get data(): Object {
    return this.#data;
  }

  get template(): function {
    return this.#template;
  }
}
