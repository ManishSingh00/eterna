import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const config = {
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/tests/unit/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default createJestConfig(config);
