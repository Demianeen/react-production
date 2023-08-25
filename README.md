# React-production

This repository was created as part of the UlbiTV's course "To production on React".

## Launching the project

- `npm install` - install dependencies
- `npm run start:dev` or `npm run start:dev:vite` - launch server + frontend project in dev mode

---

## Scripts

- `npm start` - Launch frontend project on webpack dev server + backend
- `npm run storybook` - Launch Storybook
- `npm run start:dev:vite` - Launch frontend project on vite + backend
- `npm run start:dev:client` - Launch frontend project on webpack dev server
- `npm run start:dev:vite:client` - Launch frontend project on vite
- `npm run start:dev:server` - Launch backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode (not minimized)
- `npm run build:prod:analyze` - Build in prod mode and open bundle analyzer
- `npm run build:storybook` - Build storybook
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
- `npm run generate:slice` - Script for generating FSD slices,
- `npm run prepare` - Pre-commit hooks
- `npm run remove:feature` - Removes feature using feature flag name, and state on/off (read more about feature flags [here](#working-with-feature-flags))
- `npm run check:layerDocs` - Checks if README.md files in each layer in src/ are up to date with the public API. Read more [here](scripts/checkLayerDocs/index.ts)
- `npm run postinstall` - Apply patches after npm i

---

## Recommended Extensions for Visual Studio Code

To improve your development experience, we recommend installing the following extensions for Visual Studio Code:

- **ESLint** (`dbaeumer.vscode-eslint`): Integrates ESLint into VS Code to provide linting for JavaScript and TypeScript code.
- **Prettier** (`esbenp.prettier-vscode`): An opinionated code formatter that integrates with VS Code to automatically format your code.

You can install these extensions by searching for their names in the Extensions tab in Visual Studio Code or by using the `@recommended:workspace` filter to see a list of recommended extensions.

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
2. Component testing with React testing library -`npm run test:unit`
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

In pre-commit hooks we check the project with [lint-staged](https://github.com/okonet/lint-staged), config in /.husky.

---

### Working with data

Interaction with data is carried out using Redux Toolkit.

If possible, reusable entities must be normalized using EntityAdapter.

Requests to the server are sent using [RTK query](./src/shared/api/rtkApi.ts).

For asynchronous connection of reducers (to avoid bundling them together in one bundle) use [useDynamicModuleLoader](./src/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader.ts).

---

### Mocking request

Mock service worker (msw) is used to mock requests during tests and storybook stories.

More about [msw](./docs/msw.md).

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

## App slices

### Shared

Shared folder contains all shared code that can be used in any part of the app and that is not related to any particular entity.

### Entities

Reusable parts that are related to particular entity. They are later merged into meaningful blocks in widgets.

- [Article](./src/entities/Article/README.md): reusable article related components and functionality.
- [Comment](./src/entities/Comment/README.md): reusable comment related components and functionality.
- [CommentForm](./src/entities/CommentForm/README.md): reusable comment form.
- [Counter](./src/entities/Counter/README.md): counter.
- [Country](./src/entities/Country/README.md): reusable country related components and functionality (e.g. SelectCountry).
- [Currency](./src/entities/Currency/README.md): reusable currency related components and functionality (e.g. SelectCurrency).
- [Notification](./src/entities/Notification/README.md): reusable notification related components and functionality.
- [Order](./src/entities/Order/README.md): reusable sort order related components and functionality (e.g. SelectOrder).
- [Profile](./src/entities/Profile/README.md): reusable profile related components and functionality.
- [Rating](./src/entities/Rating/README.md): reusable rating related components and functionality.
- [SortField](./src/entities/SortField/README.md): reusable sort field related components and functionality (e.g. SelectSortField).
- [User](./src/entities/User/README.md): reusable user related components and functionality.
- [View](./src/entities/View/README.md): reusable view related components and functionality (e.g. SelectView).

### Features

Features are some functionality blocks that provide functionality for the user.

One feature = one functionality.

- [ArticleCommentList](./src/features/ArticleCommentList/README.md): displays a list of comments for a given article.
- [ArticleListFilters](./src/features/ArticleListFilters/README.md): allows users to filter articles based on various criteria.
- [ArticlePageGreeting](./src/features/ArticlePageGreeting/README.md): displays a greeting message on the article page when user first time enter it.
- [ArticleRating](./src/features/ArticleRating/README.md): allows users to rate articles.
- [ArticleRecommendationsList](./src/features/ArticleRecommendationsList/README.md): displays a list of recommended articles.
- [AuthByUsername](./src/features/AuthByUsername/README.md): allows users to login or register using their username.
- [EditArticle](./src/features/EditArticle/README.md): allows users to edit articles.
- [EditableProfileCard](./src/features/EditableProfileCard/README.md): displays a user's profile information and if user has rights, allows to edit it.
- [LangSwitcher](./src/features/LangSwitcher/README.md): allows users to switch between different languages.
- [NotificationButton](./src/features/NotificationButton/README.md): displays a notifications on button click.
- [ProfileRating](./src/features/ProfileRating/README.md): allows users to rate profiles.
- [ScrollToTop](./src/features/ScrollToTop/README.md): allows users to scroll to the top of the page.
- [ThemeSwitcher](./src/features/ThemeSwitcher/README.md): allows users to switch between different themes.
- [ToggleDesign](./src/features/ToggleDesign/README.md): allows users to toggle between different designs.
- [UserDropdown](./src/features/UserDropdown/README.md): displays a dropdown menu for the user.
- [UserNavigation](./src/features/UserNavigation/README.md): displays navigation links for the user.

### Widgets

Widgets merge reusable entity blocks with features, creating meaningful blocks.

- [ArticleAdditionalInfo](./src/widgets/ArticleAdditionalInfo/README.md): displays additional information about an article, such as the author, date, and number of views.
- [ArticleInfiniteList](./src/widgets/ArticleInfiniteList/README.md): displays a list of articles that can be scrolled infinitely.
- [LoaderLayout](./src/widgets/LoaderLayout/README.md): displays the whole page skeleton while content is being loaded, and then displays the content once it's ready.
- [Navbar](./src/widgets/Navbar/README.md): displays a user related data like notifications or user panel.
- [Page](./src/widgets/Page/README.md): a basic page component that sets default page styles(e.g. paddings, margins) and shared page functionality (e.g. restoring page scroll position).
- [PageError](./src/widgets/PageError/README.md): displays an error blcok with message when a page fails to load.
- [PageLoader](./src/widgets/PageLoader/README.md): displays a full page loading spinner while a page is being loaded.
- [ScrollToolbar](./src/widgets/ScrollToolbar/README.md): displays a toolbar to go to the top of the page that appears when the user scrolls down the page.
- [Sidebar](./src/widgets/Sidebar/README.md): displays a sidebar with links to different sections of the website.

### Pages

Pages are composed of widgets and features while remaining as "thin" as possible.

- [AboutPage](./src/pages/AboutPage/README.md): displays information about the website and its creators.
- [AdminPanelPage](./src/pages/AdminPanelPage/README.md): provides access to the website's administrative tools.
- [ArticleDetailsPage](./src/pages/ArticleDetailsPage/README.md): displays the details of a specific article.
- [ArticleEditPage](./src/pages/ArticleEditPage/README.md): allows the user to edit an existing article.
- [ArticlesPage](./src/pages/ArticlesPage/README.md): displays a list of articles.
- [ForbiddenPage](./src/pages/ForbiddenPage/README.md): displays an error message when the user tries to access a forbidden page.
- [HomePage](./src/pages/HomePage/README.md): displays the website's home page. Every user starts here.
- [NotFoundPage](./src/pages/NotFoundPage/README.md): displays an error message when the user tries to access a non-existent page.
- [ProfilePage](./src/pages/ProfilePage/README.md): displays the user's profile information.
- [SettingsPage](./src/pages/SettingsPage/README.md): allows the user to modify their account settings.

### App

App folder contains all app related code that is not used in any other slices at any time (except types).
