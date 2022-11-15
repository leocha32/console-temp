module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },

  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react/no-unknown-property': ['off', { ignore: ['css'] }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: ['objectLiteralProperty', 'objectLiteralMethod'],
        format: null,
        leadingUnderscore: 'allow',
      },
      {
        selector: [
          'classProperty',
          'typeProperty',
          'classMethod',
          'typeMethod',
          'accessor',
        ],
        format: ['camelCase'],
        modifiers: ['requiresQuotes'],
      },
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: ['variable', 'enumMember'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        custom: {
          regex: '^T[A-Z]?',
          match: true,
        },
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
      },
    ],
    'max-len': ['warn', { code: 100 }],
    'react-hooks/rules-of-hooks': ['error'],
    'react-hooks/exhaustive-deps': ['warn'],
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
};
