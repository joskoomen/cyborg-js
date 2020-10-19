import  Component  from '../Component';
import NotificationController from '../../notifications/NotificationController';
import { mocked } from 'ts-jest/utils';

let componentA: Component;
let componentB: Component;

const createView = () => {
  let html = '<div id="componentA" data-component="componentA"></div>';
  html += '<div id="componentB" data-component="componentB">';
  html += '<span>Child element</span></div>';
  window.document.body.innerHTML = html;
};


beforeAll(() => {
  createView();
  mocked;
  const aEl: HTMLElement | null = document.getElementById('componentA');
  const bEl: HTMLElement | null = document.getElementById('componentB');
  if (aEl) {
    componentA = new Component();
    componentA.bind(aEl);
  }
  if (bEl) {
    componentB = new Component();
    componentB.bind(bEl);
  }
});

test('Component has a name, notifications and element', () => {
  expect(componentA.el).not.toBeNull();
  expect(componentA.notifications).not.toBeUndefined();
});

test('Components registers events', () => {
  const handler: any = jest.fn();
  componentA.addEventListener('click', handler);
  expect(componentA.events).toHaveLength(1);

  componentA.removeEventListener('click', handler);
  expect(componentA.events).toHaveLength(0);
});

test('Components handles notifications', () => {
  const listener: any = jest.spyOn(componentB, 'handleNotifications');
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
  if (componentB.el) {
    expect(componentB.el.children).toHaveLength(1);

    componentB.render({});
    expect(componentB.el.children).toHaveLength(0);
  }
});

describe('Component destroy', () => {
  it('shouldn\'t have any listeners', () => {
    const nc: NotificationController = NotificationController.getInstance();
    const handler: any = jest.fn();

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
    expect(componentA.events).toHaveLength(0);
    expect(componentB.events).toHaveLength(0);
  });
});
