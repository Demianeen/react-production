module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: false,
  },
  root: true,
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
  plugins: ['@typescript-eslint'],
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

    // temporary disabled rules, should be enabled later
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    // enforces to use type imports when importing types
    '@typescript-eslint/consistent-type-imports': [
      2,
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],

    // allow us to use expressions in fragments top level
    'react/jsx-no-useless-fragment': [
      2,
      { allowExpressions: true },
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
      // override rules for development environment
      files: [
        '**/src/**/*.{stories,test}.{ts,tsx}',
        '**/storybook/**/*.{ts,tsx}',
        '**/tests/**/*.{ts,tsx}',
      ],
      rules: {
        // we don't need internalization in tests
        'i18next/no-literal-string': 0,
        // we use props spreading in stories
        'react/jsx-props-no-spreading': 0,
        // we can use dev dependencies in development
        'import/no-extraneous-dependencies': 0,
      },
    },
    {
      // override rules for redux slices
      files: ['src/**/*Slice.ts'],
      // we can use props reassignments in redux slices like this: state.counter += 1
      rules: {
        'no-param-reassign': ['error', { props: false }],
      },
    },
    {
      // override rules for reducerManager
      files: [
        'src/app/providers/StoreProvider/config/reducerManager.ts',
      ],
      rules: {
        // we need to it inside reducerManager
        'no-param-reassign': 0,
      },
    },
  ],
}
