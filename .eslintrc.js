module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'apos', 'args': 'none', 'ignoreRestSiblings': true }],
    'no-var': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
