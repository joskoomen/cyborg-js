// @flow
import MotherBoard from './MotherBoard';
import Component from './components/Component';
import Notification from './notifications/Notification';
import { throttle } from './functions/throttle';
import { equal } from './functions/equal';
import { shuffle } from './functions/shuffle';

class App {

  constructor(pMotherBoard: MotherBoard, pComponentsMap: Object, pTarget: HTMLElement = window.document) {
    if (!pMotherBoard) {
      pMotherBoard = new MotherBoard();
    }
    pMotherBoard.init(pComponentsMap, pTarget);
  }
}

const createApp: function = (pTarget: HTMLElement, pComponentsMap: Object, pMotherBoard: MotherBoard): App => {
  return new App(pMotherBoard, pComponentsMap, pTarget);
};

export {
  MotherBoard,
  Component,
  Notification,
  throttle,
  equal,
  shuffle,
  createApp
};
