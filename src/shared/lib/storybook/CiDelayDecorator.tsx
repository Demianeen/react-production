import type { StoryFn } from '@storybook/react'
import { LokiDelayDecorator } from './LokiDelayDecorator'

/**
 * Makes a delay between capturing screenshot. Works only in CI environment. Otherwise just renders the story component.
 */
export const CiDelayDecorator = (StoryComponent: StoryFn) => {
  // runs only on CI
  if (process.env.GITHUB_ACTIONS) {
    return LokiDelayDecorator()(StoryComponent)
  }

  return <StoryComponent />
}
