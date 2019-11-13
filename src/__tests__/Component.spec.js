// @flow
import Component from '../components/Component';
import MotherBoard from '../MotherBoard';
import NotificationController from '../notifications/NotificationController';
import ComponentMock from './__mocks__/ComponentMock';

let componentA: Component;
let componentB: Component;
let motherboard: MotherBoard;

const createView = () => {
  let html = '<div id="componentA" data-component="componentA"></div>';
  html += '<div id="componentB" data-component="componentB">';
  html += '<span>Child element</span></div>';
  window.document.body.innerHTML = html;
};

beforeAll(() => {
  createView();

  motherboard = new MotherBoard();
  motherboard.init({ 'test': ComponentMock });

  componentA = new Component();
  componentA.init(motherboard);
  componentA.bind(document.getElementById('componentA'));

  componentB = new Component();
  componentB.init(motherboard);
  componentB.bind(document.getElementById('componentB'));
});

test('Component has a name and element', () => {
  expect(componentA.el).not.toBeUndefined();
  expect(componentA.name).not.toBeUndefined();
});

test('Components registers events', () => {
  const handler: function = jest.fn();
  componentA.addEventListener('click', handler);
  expect(componentA.events).toHaveLength(1);

  componentA.removeEventListener('click', handler);
  expect(componentA.events).toHaveLength(0);
});

test('Components handles notifications', () => {
  const listener: function = jest.spyOn(componentB, 'handleNotifications');
  componentB.addListener('test');
  componentA.notify('test');
  expect(listener).toHaveBeenCalledTimes(1);

  componentB.removeListener('test');
  setTimeout(() => {
    componentA.notify('test');
    expect(listener).toHaveBeenCalledTimes(0);
  }, 0);
});

test('Components renders templates', () => {
  expect(componentB.el.children).toHaveLength(1);
  componentB.render({});
  expect(componentB.el.children).toHaveLength(0);
});

describe('Component destroy', () => {

  it('shouldn\'t have any listeners', () => {
    const nc: NotificationController = NotificationController.getInstance();
    const handler: function = jest.fn();

    componentA.addEventListener('click', handler);
    componentB.addEventListener('click', handler);
    componentA.addListener('destroy_test');
    componentB.addListener('destroy_test');

    expect(nc.listeners.length).toBeGreaterThanOrEqual(1);
    expect(componentA.events).toHaveLength(1);
    expect(componentB.events).toHaveLength(1);

    componentA.destroy();
    componentB.destroy();

    expect(nc.listeners).toHaveLength(0);
    expect(componentA.events).toBeUndefined();
    expect(componentB.events).toBeUndefined();
  });
});
