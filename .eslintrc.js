module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb-typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import", "prettier"],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "react/function-component-definition": "off",
    "arrow-body-style": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", "tsx"] }],
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
    "max-len": "off",
    "prettier/prettier": ["error", { singleQuote: true }],
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          "{}": false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
};
