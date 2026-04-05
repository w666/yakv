import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    coverageReporters: ['json-summary', 'lcov', 'text', 'clover'],
    maxWorkers: 1,
};

export default config;
