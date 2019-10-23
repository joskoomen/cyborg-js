// @flow
import Component from '../components/Component';

let componentA: Component;
let componentB: Component;

const createView = () => {
  let html = '<div id="componentA" data-component="componentA"></div>';
  html += '<div id="componentB" data-component="componentB"></div>';
  window.document.body.innerHTML = html;
};

beforeAll(() => {
  createView();
  componentA = new Component();
  componentA.bind(document.getElementById('componentA'));

  componentB = new Component();
  componentB.bind(document.getElementById('componentB'));
});

test('Component has a name and element', () => {
  expect(componentA.el).not.toBeUndefined();
  expect(componentA.name).not.toBeUndefined();
});

test('Components registers Events', () => {
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
