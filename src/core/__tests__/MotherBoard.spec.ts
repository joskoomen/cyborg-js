// @flow
import MotherBoard from '../MotherBoard';
import { mocked } from 'ts-jest/utils';
import Component from '../Component';

let motherboard: MotherBoard;
let component: Component;

const createView = () => {
  window.document.body.innerHTML =
    '<div id="test" data-component="test"><span>Hello Test</span></div>';
};

beforeAll(() => {
  mocked;
  component = new Component();
});

beforeEach(() => {
  motherboard = MotherBoard.getInstance();
  motherboard.componentsMap = { test: component };
  createView();
});

test('MotherBoard is singleton', () => {
  expect(motherboard).toBeInstanceOf(MotherBoard);
  expect(() => {
    motherboard = new MotherBoard();
  }).toThrow(/MotherBoard.getInstance()/);
});

test('MotherBoard responds on DOMContentLoaded', () => {
  const mbBind: any = jest.spyOn(motherboard, 'bind');
  const mbBuild: any = jest.spyOn(motherboard, 'build');
  document.dispatchEvent(new Event('DOMContentLoaded'));

  expect(mbBind).toHaveBeenCalledTimes(1);
  expect(mbBuild).toHaveBeenCalledTimes(1);
});

test('MotherBoard registers Notifications', () => {
  motherboard.registerNotification({
    name: 'test',
    notifications: [],
    classRef: component,
  });
});

test('MotherBoard responds on window.onload', () => {
  const onload: any = jest.spyOn(motherboard, 'onload');
  window.dispatchEvent(new Event('load'));
  expect(onload).toHaveBeenCalledTimes(1);
});

test('MotherBoard should remove core on destroy', () => {
  const test: HTMLElement | null = document.getElementById('test');
  if (test) {
    component.bind(test);
    motherboard.build(test);
    expect(motherboard.components.length).toBeGreaterThanOrEqual(1);

    const destroy: any = jest.spyOn(motherboard, 'destroy');
    window.dispatchEvent(new Event('pagehide'));
    expect(destroy).toHaveBeenCalledTimes(1);
    expect(motherboard.components).toHaveLength(0);
  }
  expect(test).not.toBeNull();
});
