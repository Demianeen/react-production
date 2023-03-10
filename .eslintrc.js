module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: false,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:i18next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    jsx: true,
    sourceType: 'module',
    useJSXTextNode: true,
    project: './tsconfig.json',
  },
  rules: {
    // ensures that we can handle undefined straight in the component if needed
    'react/require-default-props': 0,
    // ensures that we can use named exports
    'import/prefer-default-export': 0,
    // ensure that every unused variable have underscore in the front
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    // disallow spreading props in custom components except those from libraries
    'react/jsx-props-no-spreading': [
      1,
      {
        html: 'ignore',
        exceptions: ['Link'],
      },
    ],
    // ensure that every function component declared as an arrow function
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    // import React is not required in React 17 and above
    'react/react-in-jsx-scope': 0,
    // we can use @ts-expect-error with description
    '@typescript-eslint/ban-ts-comment': [
      2,
      { 'ts-expect-error': 'allow-with-description' },
    ],
    // we use underlines for webpack env variables
    'no-underscore-dangle': 0,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'default',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowDouble',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    // ensures that eslint understand absolute paths correctly
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  overrides: [
    {
      // we import webpack and webpack plugins only during build
      files: ['config/build/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
}
