module.exports = {
  root: true,
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  rules: {
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "unknown", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "never",
      },
    ],
  },
};
