import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    maxWorkers: 1,
};

export default config;
