module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn', // <--- THIS IS THE NEW RULE
    curly: 'off',
  },
};
