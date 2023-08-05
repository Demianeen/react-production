# Mocking request

Mock Service Worker (MSW) is a tool that allows you to mock HTTP requests during testing and when developing Storybook stories. MSW starts automatically when you run tests or Storybook.

MSW uses handlers to intercept and handle requests. Here is an example of a handler for the /comments endpoint:

```ts
export const commentHandlers = [
  rest.get('/comments', (req, res, ctx) => {
    // checks if storybook story name includes loading
    if (isMockLoading()) {
      // returns infinite delay response
      return res(ctx.status(200), ctx.json({}), ctx.delay('infinite'))
    }

    // checks if story name includes "error"
    if (isMockError()) {
      return res(ctx.status(500), ctx.json({}))
    }

    // checks if story name includes "empty"
    if (isMockEmpty()) {
      return res(ctx.status(200), ctx.json([]))
    }

    // for story specific states use `isStoryNameIncludes`
    if (isStoryNameIncludes('unauthorized')) {
      return res(ctx.status(500), ctx.json({}))
    }

    // returns mock data
    return res(ctx.status(200), ctx.json(mockComments))
  }),
]
```

## Naming and placing

All MSW handlers files and variables includes "Handlers" e.g. `commentHandlers`, `profileHandlers`,`commentHandlers.ts`.

Handlers should be created inside the same slice inside `mocks` folder or in shared layer if they aren't connected to any slice (e.g. [imageHandlers](../src/shared/lib/mock-server/imageHandlers.ts))

## Msw documentation

Link to the documentation [here](https://mswjs.io/docs/)
