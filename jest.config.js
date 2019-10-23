/* eslint-disable import/unambiguous, import/no-commonjs */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/src/**/__tests__/**/*',
  ],
  coverageDirectory: './coverage/',
  coverageReporters: ['json'],
  moduleFileExtensions: ['js', 'json'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '__tests__/.*\\.spec\\.js$',
  testURL: 'https://cyborg-js.org',
  transform: {
    '.+\\.js?$': 'babel-jest'
  },
  transformIgnorePatterns: ['node_modules']
};
