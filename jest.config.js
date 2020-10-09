/* eslint-disable import/unambiguous, import/no-commonjs */

module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?)$",
  testPathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "js", "json"],
  collectCoverage: true
};
