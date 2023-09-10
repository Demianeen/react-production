/**
 * @type {import("eslint").Linter.Config}
 */
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
    project: ['./**/tsconfig*.json'],
  },
  plugins: [
    '@typescript-eslint',
    'netliukh-demian-fsd-plugin',
    'unused-imports',
    'prefer-arrow',
  ],
  ignorePatterns: ['.eslintrc.js', 'cypress.config.ts'],
  settings: {
    react: {
      version: 'detect',
    },
    // ensures that eslint understand absolute paths correctly
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    typescript: {},
  },
  rules: {
    // ensures that we can handle undefined straight in the component if needed
    'react/require-default-props': 0,
    // ensures that we can use named exports
    'import/prefer-default-export': 0,
    // ensure that every unused variable have underscore in the front
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
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

    'padding-line-between-statements': [
      'error',
      // enforces no blank line between imports
      { blankLine: 'never', prev: 'import', next: 'import' },
    ],

    // enforces consistent naming
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowDouble',
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'allowDouble',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      // ignores names with quotes like 'data-testid'
      {
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
      },
    ],

    // to import dev dependencies in some files
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/test/**', // tape, common npm pattern
          '**/tests/**', // tape, common npm pattern
          'spec/**', // mocha, rspec-like pattern
          '**/__tests__/**', // jest pattern
          '**/__mocks__/**', // jest pattern
          '**/*{.,_}{test,stories}.{ts,tsx}', // mocks and stories where the extension or filename suffix denotes that it is a test
          '.eslintrc.js', // eslint config
          '**/webpack.config.ts', // webpack config
          'vite.config.ts', // vite config
          'config/**', // project configuration
          '**/storybook/**', // storybook configuration
          'utils/**', // project utils
          'scripts/**', // project scripts
          '**/jest/**', // jest config
          '**/mocks/**', // mocks
          '**/mock-server/**', // mock server
          'cypress/**', // cypress
          'server/**', // json-server
        ],
      },
    ],

    // we can stop importing React after version 17
    'react/jsx-no-undef': 0,

    // temporary disabled rules, should be enabled later
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    // enforces to use type imports when importing const
    '@typescript-eslint/consistent-type-imports': [
      2,
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],

    // allow us to use expressions in fragments top level
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],

    // we always need to add deps to useEffect
    'react-hooks/exhaustive-deps': 2,

    'import/no-cycle': 0,

    // checks if path should be relative
    'netliukh-demian-fsd-plugin/check-path': [
      2,
      {
        alias: '@/',
      },
    ],

    // check if absolute imports is imported from public api
    'netliukh-demian-fsd-plugin/public-api-imports': [
      2,
      {
        alias: '@/',
        testFilesPatterns: [
          '**/*.test.*',
          '**/storybook/**',
          '**/*.stories.*',
          '**/mocks/*',
        ],
      },
    ],

    // disallows imports from higher layers
    'netliukh-demian-fsd-plugin/layer-imports': [
      2,
      {
        alias: '@/',
        ignoreFilesPatterns: [
          '**/StoreProvider',
          'entities/User',
          'app/providers/StoreProvider/config/stateSchema',
        ],
      },
    ],

    // we use only Button component where type is required
    'react/button-has-type': 0,

    // to stop getting error highlights from prettier autoformatting
    'prettier/prettier': 0,

    // remove unused imports
    'unused-imports/no-unused-imports': 1,

    // we can use props spreading sometimes
    'react/jsx-props-no-spreading': 0,

    // TODO: turn on later
    'react/no-unstable-nested-components': 0,

    // enforce arrow function
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      2,
      {
        classPropertiesAllowed: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],

    // enforce to use style function typing in one way
    '@typescript-eslint/prefer-function-type': 2,

    // TODO: enforce later
    'react/display-name': 1,
  },
  overrides: [
    {
      // override rules for development environment
      files: [
        '**/src/**/*.{stories,test}.{ts,tsx}',
        '**/storybook/**/*.{ts,tsx}',
        '**/mocks/**/*.{ts,tsx}',
      ],
      rules: {
        // we don't need internalization in mocks
        'i18next/no-literal-string': 0,
        // we use props spreading in stories
        'react/jsx-props-no-spreading': 0,
        // it gives error when using hook in a storybook component as `() => <Component />` instead of `Component`
        'react-hooks/rules-of-hooks': 0,
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
    {
      files: ['src/**/*'],
      excludedFiles: ['src/**/*.stories.tsx'],
      rules: {
        // no console in production
        'no-console': 2,
      },
    },
    {
      // override rules for slice services
      files: ['src/**/model/services/**/*.ts'],
      rules: {
        // we can make props not required in redux services
        '@typescript-eslint/default-param-last': 0,
      },
    },
    {
      // override rules for scripts
      files: ['scripts/**/*.{ts,tsx}'],
      rules: {
        // we can use console in scripts files
        'no-console': 0,
      },
    },
    {
      // override rules for jest config
      files: ['config/jest/**/*.{ts,tsx}'],
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/naming-convention': 0,
      },
    },
    {
      // places where to turn off layer-imports
      files: ['src/shared/lib/storybook/*'],
      rules: {
        'netliukh-demian-fsd-plugin/layer-imports': 0,
      },
    },
    {
      // we don't need to add display name for storybook decorators
      files: ['src/shared/lib/storybook/*'],
      rules: {
        'react/display-name': 0,
      },
    },
    {
      // override rules for cypress
      files: ['cypress/**/*.{ts,tsx}'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        '@typescript-eslint/no-namespace': 0,
      },
    },
    {
      // allows as to use react components without transforming them into shorthand arrow function syntax
      files: ['**/*.tsx'],
      rules: {
        'arrow-body-style': 0,
      },
    },
  ],
  globals: {
    __IS_DEV__: false,
    __API__: false,
  },
}
