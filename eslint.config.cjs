module.exports = [
  {
    files: ["src/**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs"
    },

    rules: {
      "no-var": "error",
      "eqeqeq": ["error", "always"],
      "no-unused-vars": "error",
      "curly": ["error", "all"]
    }
  }
];
