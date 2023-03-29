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
    'plugin:storybook/recommended',
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
      {
        'ts-expect-error': 'allow-with-description',
      },
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
    // to import dev dependencies in some files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**', // tape, common npm pattern
          '**/tests/**', // also common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          '**/*{.,_}{test,stories}.{ts,tsx}', // tests and stories where the extension or filename suffix denotes that it is a test
          '.eslintrc.js', // eslint config
          '**/webpack.config.ts', // webpack config
          'config/**', // project configuration
          '**/storybook/**', // storybook configuration
        ],
      },
    ],

    // we can stop importing React after version 17
    'react/jsx-no-undef': 0,
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
      files: [
        '**/src/**/*.{stories,test}.{ts,tsx}',
        '**/storybook/**/*.{ts,tsx}',
      ],
      rules: {
        'i18next/no-literal-string': 0,
        'react/jsx-props-no-spreading': 0,
      },
    },
  ],
}
