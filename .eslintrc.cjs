module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  ignorePatterns: ["static", ".eslintrc.cjs", "node_modules"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "prefer-const": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".jsx", ".tsx", ".ts", ".js"],
      },
      alias: {
        extensions: [".jsx", ".tsx", ".ts", ".js"],
        map: [
          ["assets", "./src/assets"],
          ["components/*", "./src/components"],
          ["api", "./src/api"],
          ["pages", "./src/pages"],
          ["state", "./src/state"],
        ],
      },
    },
    react: {
      version: "detect",
    },
  },
};
