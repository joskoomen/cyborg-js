/* eslint-disable */

// Import this named export into your test file:
export const moObserve = jest.fn();
export const moDisconnect = jest.fn();

const moMock = jest.fn().mockImplementation(() => {
  return {
    observe: moObserve,
    disconnect: moDisconnect
  };
});

export default moMock;
