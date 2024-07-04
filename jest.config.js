module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/public/**/*.test.js', '**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
