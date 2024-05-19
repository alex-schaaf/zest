// import path from "path"
import type { JestConfigWithTsJest } from "ts-jest"

const config: JestConfigWithTsJest = {
  setupFiles: ["<rootDir>/../test/setTestEnvVars.ts"],
  moduleFileExtensions: ["js", "json", "ts"],
  preset: "ts-jest",
  // rootDir: path.resolve(__dirname, "src"),
  rootDir: "src",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
}

export default config
