import js from "@eslint/js";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.jest },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  globalIgnores(["webpack.*", "dist/"]),
]);
