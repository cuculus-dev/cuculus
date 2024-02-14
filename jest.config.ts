import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './src',
});

const config = createJestConfig({
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  moduleNameMapper: {
    react: 'next/dist/compiled/react/cjs/react.development.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
});

export default config;
