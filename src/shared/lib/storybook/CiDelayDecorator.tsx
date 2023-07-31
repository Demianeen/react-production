import type { StoryFn } from '@storybook/react'

/**
 * Makes a delay between capturing screenshot. Works only in CI environment. Otherwise just renders the story component.
 */
export const CiDelayDecorator = (StoryComponent: StoryFn) => {
  // runs only on CI
  if (process.env.GITHUB_ACTIONS) {
    throw new Error('Not implemented')
    // return LokiDelayDecorator()(StoryComponent)
  }

  return <StoryComponent />
}
