/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["plugin:storybook/recommended", "@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
