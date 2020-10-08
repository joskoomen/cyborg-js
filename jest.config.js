/* eslint-disable import/unambiguous, import/no-commonjs */

module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: [
    "**/__tests__/**/*.+(ts|ts|js)",
    "**/?(*.)+(spec|test).+(ts|ts|js)"
  ],
  transform: {
    "^.+\\.(ts|ts)$": "ts-jest"
  }
};
