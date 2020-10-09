// Import this named export into your test file:
export const ncAddListener = jest.fn();
export const ncRemoveListener = jest.fn();
export const ncBind = jest.fn();
export const ncGetInstance = jest.fn();
export const ncDestroy = jest.fn();

const ncMock = jest.fn().mockImplementation(() => {
  return {
    bind: ncBind,
    getInstance: ncGetInstance,
    addListener: ncAddListener,
    removeListener: ncRemoveListener,
    destroy: ncDestroy
  };
});

export default ncMock;
