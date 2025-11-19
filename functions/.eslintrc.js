module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "quotes": ["error", "double"],
    "comma-dangle": ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "no-console": "off", // Allow console.log in functions
  },
  ignorePatterns: ["lib/**", "node_modules/**", "*.js"],
  overrides: [{
    files: ["*.ts"],
    parserOptions: {
      project: null
    },
    extends: [
      "eslint:recommended",
    ],
    rules: {
      "quotes": ["error", "double"],
      "comma-dangle": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "no-console": "off",
    }
  }]
};
