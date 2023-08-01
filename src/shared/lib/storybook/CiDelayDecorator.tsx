import type { StoryFn } from '@storybook/react'
import { LokiDelayDecorator } from './LokiDelayDecorator'

/**
 * Makes a delay between capturing screenshot. Works only in CI environment. Otherwise just renders the story component.
 */
export const CiDelayDecorator = (StoryComponent: StoryFn) => {
  // runs only on CI
  if (process.env.STORYBOOK_CI === 'true') {
    return LokiDelayDecorator(10000)(StoryComponent)
  }

  return <StoryComponent />
}
