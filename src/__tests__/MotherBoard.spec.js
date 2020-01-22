// @flow
import MotherBoard from '../MotherBoard';
import ComponentMock from './__mocks__/ComponentMock';
import { registerNotification } from '../functions/registerNotification';

let motherboard: MotherBoard;

const createView = () => {
  window.document.body.innerHTML = '<div id="test" data-component="test"><span>Hello Test</span></div>';
};

beforeEach(() => {
  motherboard = MotherBoard.getInstance();
  motherboard.componentsMap = { 'test': ComponentMock };
  createView();
});

test('MotherBoard is singleton', () => {
  expect(motherboard).toBeInstanceOf(MotherBoard);
  expect(() => {
    motherboard = new MotherBoard();
  }).toThrow(/MotherBoard.getInstance()/);
});

test('MotherBoard responds on DOMContentLoaded', () => {
  const mbBind: function = jest.spyOn(motherboard, 'bind');
  const mbBuild: function = jest.spyOn(motherboard, 'build');
  document.dispatchEvent(new Event('DOMContentLoaded'));

  expect(mbBind).toHaveBeenCalledTimes(1);
  expect(mbBuild).toHaveBeenCalledTimes(1);
});

test('MotherBoard registers Notifications', () => {
  const cMock = new ComponentMock();
  registerNotification({
    name: 'test',
    notifications: [],
    classRef: cMock
  });
});

test('MotherBoard responds on window.onload', () => {
  const onload: function = jest.spyOn(motherboard, 'onload');
  window.dispatchEvent(new Event('load'));
  expect(onload).toHaveBeenCalledTimes(1);
});

test('MotherBoard should remove core on destroy', () => {
  const component: ComponentMock = new ComponentMock();
  component.bind(document.getElementById('test'));
  motherboard.components.push(component);
  expect(motherboard.components.length).toBeGreaterThanOrEqual(1);

  const destroy: function = jest.spyOn(motherboard, 'destroy');
  window.dispatchEvent(new Event('beforeunload'));
  expect(destroy).toHaveBeenCalledTimes(1);
  expect(motherboard.components).toHaveLength(0);
});
