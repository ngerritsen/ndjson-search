module.exports = {
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  plugins: ['prettier'],
  rules: {
    "prettier/prettier": ["error", {"singleQuote": true}]

  }
}
