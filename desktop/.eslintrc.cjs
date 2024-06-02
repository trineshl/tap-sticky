module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    },
  ],
  "globals": {
    "process": "readonly",  // This variable is read-only
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "semi": "error",
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "caughtErrors": "none" }],
  }
};