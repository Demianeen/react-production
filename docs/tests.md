# Testing

The project uses 4 types of tests:

1. Regular unit tests on jest - `pnpm test:unit`
2. Component testing with React testing library -`pnpm test:unit`
3. Screenshot testing with loki `pnpm test:ui`
4. e2e testing with Cypress `pnpm test:e2e`

## Unit tests

### Redux

#### Mocking async thunk actions

Use [TestAsyncThunk class](../src/shared/lib/tests/TestAsyncThunk/TestAsyncThunk.ts).

This class is used to test async thunks.
It mocks dispatch, getState and thunk extra arguments.

Usage:

```ts
// defines mocked state for the test
const state = {
  articleDetails: {
    data: {
      id: 1,
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

// creates a new instance of TestAsyncThunk. First argument is the thunk to test, second is the mocked state
const thunk = new TestAsyncThunk(sendArticleComment, state)

// defines the expected result
const newComment = {
  body: 'new comment body',
  id: 4,
}

// mocks axios.post
thunk.api.post.mockReturnValue(
  Promise.resolve({
    data: newComment,
  })
)

// calls the mocked thunk
const result = await thunk.call('new comment body')

// asserts the result
expect(result.payload).toEqual(newComment)
expect(thunk.api.post).toHaveBeenCalled()
expect(result.meta.requestStatus).toEqual('fulfilled')
```

#### Mocking `createEntityAdapter`

To generate data to mock `createEntityAdapter` you will need to use [getMockEntityAdapterData](../src/shared/lib/tests/getMockEntityAdapterData/getMockEntityAdapterData.ts)

Usage:

```ts
export const mockArticle: Article = {
  id: 1,
  // ...
}

export const {
  // [{id: 1, ...}, {id: 2, ...}, ..., {id: 12, ...}]
  array: mockArticles,
  /**
   * {
   *  1: {id: 1, ...},
   *  2: {id: 2, ...},
   *  ...,
   *  12: {id: 12, ...}
   * }
   **/
  entities: mockArticleEntities,
  // [1, 2, ..., 12]
  ids: mockArticleIds,
} = getMockEntityAdapterData(mockArticle, 12)

// generate mock data for 2-nd page. Ids will start from 13.
export const {
  array: anotherMockArticles,
  entities: anotherMockArticleEntities,
  ids: anotherMockArticleIds,
} = getMockEntityAdapterData(mockArticle, 12, 2)
```

## Component testing

### Test provider

This component is used to wrap the component that is being tested. It wraps with providers required for the component to work. Also it accepts options to configure the test.

Options

preloadedState - initial state for the store,
asyncReducers - reducers that are not loaded by default,
route - route to be used for the test,
featureFlags - feature flags to be used for the test

[Avaliable here](../src/shared/lib/tests/componentRender/TestProvider.tsx)

### Rendering the component

To render component use [componentRender](../src/shared/lib/tests/componentRender/componentRender.tsx)

It wraps component in [Test provider](#test-provider). Also setup userEvent and return it.

### Mocking requests

To mock requests use mock service worker. Link to the documentation [here](https://mswjs.io/docs/)

## Screenshot testing

When you run `pnpm test:ui` - loki opens chrome inside docker container (don't forget to open docker!) and makes screenshots from storybook stories.

If it finds some difference in screenshots it will show that tests failed.

### Reports

Then you can view them using `pnpm test:ui:report`. It will generate reports inside [.loki folder](../.loki/report.html).

Or you can shortcut and open report instantly in your favorite browser and making report in one command using `pnpm test:ui:report:chrome` or `pnpm test:ui:report:arc`.

### Approving changes

If the changes were as you intended, it's time to update the reference files. Run `pnpm test:ui:ok` to update reference screenshots and commit them.

### Handling flaky tests

#### Skipping tests

In some cases we need to skip ui test. To do this, just add `skip: true` in the loki parameter. Each time you use it, write a small comment why you disabled this story.

Example:

```tsx
const cannotEdit = {
  parameters: {
    loki: {
      // because when we cannot edit, this component is not rendered
      skip: true,
    },
  },
}
```

#### Asynchronous Stories

In case story need some time to render add `LokiDelayDecorator` to it.

Example:

```tsx
export default {
  title: 'entities/Article/ArticleDetails/deprecated',
  component: ArticleDetailsDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleDetailsDeprecated>
```

## E2e testing

E2E testing tests your app from the web browser to the back end of your application, as well as testing integrations with third-party APIs and services. These tests are great at ensuring your entire app is functioning as a cohesive whole.

They are using real front-end, and real back-end as well as they are more difficult to run and maintain. That's why we write them only on core functionality and to test the connection between the front-end and back-end.

### E2e component testing

To test components in real browser environment use cypress components tests.

#### Rendering the e2e component

Use `cy.mountComponent` to mount component.

It wraps component in [Test provider](#test-provider).
