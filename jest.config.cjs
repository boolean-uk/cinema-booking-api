/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    setupFilesAfterEnv: ['./test/setupTests.ts'],
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
}
