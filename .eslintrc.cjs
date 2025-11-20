module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: false },
    ],
    "@typescript-eslint/consistent-type-definitions": "off",
    "react/jsx-key": "off",
  },
  overrides: [
    {
      files: ["*.js", "*.cjs", "*.mjs", "scripts/**/*.{ts,js}", "playwright.config.ts", "jest.config.ts", "tailwind.config.ts"],
      parserOptions: {
        project: null,
      },
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "design/snapshots/**/*.png",
    "design/snapshots/**/*.webp",
  ],
};

