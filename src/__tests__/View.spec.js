// @flow
import View from '../ui/View';
import { registerNotification } from '../functions/registerNotification';
import NotificationController from '../notifications/NotificationController';

let viewA: View;
let viewB: View;
let viewC: View;

const createView = () => {
  let html = '<img id="viewA" data-view="viewA" src="img.png" disabled>';
  html += '<span id="viewB" data-view="viewB">text</span>';
  html += '<span id="viewC" data-view="viewC"><strong>Strong</strong> text</span>';
  window.document.body.innerHTML = html;
};

beforeAll(() => {
  createView();
  viewA = new View();
  viewA.bind(document.getElementById('viewA'));

  viewB = new View();
  viewB.bind(document.getElementById('viewB'));

  viewC = new View();
  viewC.bind(document.getElementById('viewC'));
});

afterAll(() => {
  viewA.destroy();
  viewB.destroy();
  viewC.destroy();
});

test('View has a name and notifications', () => {
  expect(viewA.name).not.toBeUndefined();
  expect(viewA.notifications).not.toBeUndefined();
});

test('Views can update attributes', () => {

});

test('Views can update content', () => {
  viewB.text('new text');
  expect(document.getElementById('viewB').innerText).toBe('new text');

  viewC.html('<p>Paragraph</p> text');
  expect(document.getElementById('viewC').innerHTML).toBe('<p>Paragraph</p> text');
});

test('Views can update classes', () => {
  viewB.addClass('henk');
  expect(document.getElementById('viewB').classList.contains('henk')).toBeTruthy();

  viewB.removeClass('henk');
  expect(document.getElementById('viewB').classList.contains('henk')).toBeFalsy();

  viewA.toggleClass('arie');
  expect(document.getElementById('viewA').classList.contains('arie')).toBeTruthy();
  viewA.toggleClass('arie');
  expect(document.getElementById('viewA').classList.contains('arie')).toBeFalsy();
});

test('Views handles notifications', () => {
  const listener: function = jest.spyOn(viewA, 'handleNotifications');
  registerNotification({
    name: document.getElementById('viewA').dataset.view,
    notifications: ['test', 'another'],
    classRef: viewA
  });
  NotificationController.getInstance().notify('test');
  expect(listener).toHaveBeenCalledTimes(1);
});

describe('View destroy', () => {
  it('shouldn\'t have a notifications array', () => {
    viewA.destroy();
    expect(viewA.notifications).toBeUndefined();
  });
});
