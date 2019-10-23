// Import this named export into your test file:
export const cBind = jest.fn();
export const cAddEventListener = jest.fn();
export const cOnload = jest.fn();
export const cDestroy = jest.fn();

const cMock = jest.fn().mockImplementation(() => {
  return {
    bind: cBind,
    addEventListener: cAddEventListener,
    onload: cOnload,
    destroy: cDestroy
  };
});

export default cMock;
