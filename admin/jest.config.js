const packageJson = require("./package.json");

module.exports = {
  displayName: packageJson.name,
  rootDir: "./",
  preset: "ts-jest",
  testEnvironment: "node"
};