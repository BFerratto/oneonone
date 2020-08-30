const { resolve } = require("path");
module.exports = {
  preset: "ts-jest",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: ["/node_modules/", "utils.tsx?"],
  setupFilesAfterEnv: [resolve(__dirname, "./jest.setup.js")],
};
