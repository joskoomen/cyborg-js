// @flow
/* eslint-disable */

import Component from '../components/Component';

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
  componentA = new Component();
  componentA.bind(document.getElementById('componentA'));

  componentB = new Component();
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

test('Components renders templates', () => {
  expect(componentB.el.children).toHaveLength(1);
  componentB.render({});
  expect(componentB.el.children).toHaveLength(0);
});

describe('Component destroy', () => {
  it('shouldn\'t have any listeners', () => {
    const handler: function = jest.fn();

    componentA.addEventListener('click', handler);
    componentB.addEventListener('click', handler);

    expect(componentA.events).toHaveLength(1);
    expect(componentB.events).toHaveLength(1);

    componentA.destroy();
    componentB.destroy();

    expect(componentA.events).toBeUndefined();
    expect(componentB.events).toBeUndefined();
  });
});
