# React-production

This repository was created as part of the UlbiTV's course "To production on React".

## Launching the project

- `npm install` - install dependencies
- `npm run start:dev` or `npm run start:dev:vite` - launch server + frontend project in dev mode

---

## Scripts

- `npm run start:dev` - Launch frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Launch frontend project on vite + backend
- `npm run start:dev:client` - Launch frontend project on webpack dev server
- `npm run start:dev:vite:client` - Launch frontend project on vite
- `npm run start:dev:server` - Launch backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minimized)
- `npm run build:prod:analyze` - Build in prod mode and open bundle analyzer
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter
- `npm run test:unit` - Run unit tests with jest
- `npm run test:ui` - Run screenshot tests with loki
- `npm run test:ui:ok` - Confirm new screenshots
- `npm run test:ui:ci` - Run screenshot tests in CI
- `test:ui:report` - Generate full report for screenshot tests
- `npm run test:ui:report:chrome` - Generate full report for screenshot tests and open it in Chrome
- `npm run test:ui:report:arc` - Generate full report for screenshot tests and open it in Arc
- `npm run test:ui:json` - Generate json report for screenshot tests
- `npm run test:ui:html` - Generate HTML report for screenshot tests
- `npm run storybook` - Launch Storybook
- `npm run storybook:build` - Build storybook
- `npm run prepare` - Pre-commit hooks
- `npm run remove:feature` - Removes feature using feature flag name, and state on/off (read more about feature flags [here](#working-with-feature-flags))
- `npm run generate:slice` - Script for generating FSD slices,
- `npm run postinstall` - Apply patches after npm i

---

## Project architecture

The project is written in accordance with the Feature sliced design methodology

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

---

## Working with translations

The i18next library is used in the project to work with translations.
Translation files are stored in public/locales.

For comfortable work, we recommend installing a plugin for webstorm/vscode

Link to documentation - [i18next](https://react.i18next.com/)

---

## Tests

The project uses 4 types of tests:

1. Regular unit tests on jest - `npm run test:unit`
2. Tests on components with React testing library -`npm run test:unit`
3. Screenshot testing with loki `npm run test:ui`
4. e2e testing with Cypress `npm run test:e2e`

More about tests - [testing documentation](./docs/tests.md)

---

## Linting

The project uses eslint to check typescript code and stylelint to check style files.

Also, for strict control of the main architectural principles
uses its own eslint plugin _eslint-plugin-netliukh-demian-fsd-plugin_,
which contains 3 rules

1. path-checker - prohibits the use of absolute imports within one module. Has auto fix
2. layer-imports - checks the correctness of using layers from the point of view of FSD
   (for example, widgets cannot be used in features and entities)
3. public-api-imports - allows import from other modules only from public api. Has auto fix

### Running linters

- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

---

## Storybook

In the project, story cases are described for each component.
Server requests are mocked using _msw-storybook-addon_.

The file with story cases is created next to the component with the .stories.tsx extension

You can start storybook with the command:

- `npm run storybook`

More about [Storybook](./docs/storybook.md)

---

## Project configuration

For development, the project contains 2 configs:

1. Webpack - [./config/build](./config/build)
2. Vite - [vite.config.ts](./vite.config.ts)

Both builders are adapted to the main features of the application.

All configuration is stored in /config

- [/config/babel](./config/babel) - babel
- [/config/build](./config/build) - webpack configuration
- [/config/jest](./config/jest) - test environment configuration
- [/config/storybook](./config/storybook) - storybook configuration

In the `scripts` folder there are various scripts for refactoring/simplifying code writing/generating reports etc.

---

## CI pipeline, pre-commit hooks and lint-staged

The github actions configuration is located in [/.github/workflows](./.github/workflows).
In ci, all types of tests are run, project and storybook build, linting.

In pre-commit hooks we check the project with [lint-staged](https://github.com/okonet/lint-staged), config in /.husky

---

### Working with data

Interaction with data is carried out using Redux Toolkit.
If possible, reusable entities must be normalized using EntityAdapter

Requests to the server are sent using [RTK query](./src/shared/api/rtkApi.ts)

For asynchronous connection of reducers (to avoid bundling them together in one bundle) use
[useDynamicModuleLoader](./src/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader.ts)

---

### Working with feature-flags

The use of feature flags is only allowed through the toggleFeatures helper

it takes an object with options

```js
{
   name: "feature flag name",
   on: "function that will work after turning on the feature"
   off: "function that will work after turning off the feature"
}
```

As on/off functions allowed only to use concise body arrow function (e.g. () => 1)

To automatically remove a feature, use the `remove-feature.ts` script,
which takes 2 arguments

1. Name of the feature flag to be removed
2. State (on/off)

Feature-flags in our app are not reactive, and will not update components during the session. To apply new feature-flags user need to reload website.

---

## Entities

- [Article](./src/entities/Article)
- [Comment](./src/entities/Comment)
- [Counter](./src/entities/Counter)
- [Country](./src/entities/Country)
- [Currency](./src/entities/Currency)
- [ListFilters](./src/entities/ListFilters)
- [Notification](./src/entities/Notification)
- [Profile](./src/entities/Profile)
- [Rating](./src/entities/Rating)
- [User](./src/entities/User)

## Features

- [ArticleCommentList](./src/features/ArticleCommentList)
- [ArticleInfiniteList](src/widgets/ArticleInfiniteList)
- [ArticleRating](./src/features/ArticleRating)
- [ArticleRecommendationsList](./src/features/ArticleRecommendationsList)
- [AuthByUsername](./src/features/AuthByUsername)
- [EditableProfileCard](./src/features/EditableProfileCard)
- [LangSwitcher](./src/features/LangSwitcher)
- [NotificationButton](./src/features/NotificationButton)
- [ProfileRating](./src/features/ProfileRating)
- [ThemeSwitcher](./src/features/ThemeSwitcher)
- [UserDropdown](./src/features/UserDropdown)

## Widgets

- [Navbar](./src/widgets/Navbar)
- [Page](./src/widgets/Page)
- [PageError](./src/widgets/PageError)
- [PageLoader](./src/widgets/PageLoader)
- [Sidebar](./src/widgets/Sidebar)

## Pages

- [AboutPage](./src/pages/AboutPage)
- [AdminPanelPage](./src/pages/AdminPanelPage)
- [ArticleDetailsPage](./src/pages/ArticleDetailsPage)
- [ArticleEditPage](./src/pages/ArticleEditPage)
- [ArticlesPage](./src/pages/ArticlesPage)
- [ForbiddenPage](./src/pages/ForbiddenPage)
- [HomePage](./src/pages/HomePage)
- [NotFoundPage](./src/pages/NotFoundPage)
- [ProfilePage](./src/pages/ProfilePage)
