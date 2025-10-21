// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // path root Next.js
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // pastikan file TSX/JSX di-transform menggunakan next/babel
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  transformIgnorePatterns: [
    'node_modules/(?!(next|@next|@testing-library)/)',
  ],

  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/.next/**',
  ],
};

module.exports = createJestConfig(customJestConfig);
