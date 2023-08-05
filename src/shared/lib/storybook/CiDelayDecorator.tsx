import type { StoryFn } from '@storybook/react'
import { LokiDelayDecorator } from './LokiDelayDecorator'

// FIXME: This is a workaround for now, it increases the testing time 2 times.
/**
 * Makes a delay between capturing screenshot. Works only in CI environment. Otherwise just renders the story component.
 */
export const CiDelayDecorator = (StoryComponent: StoryFn) => {
  // runs only on CI
  if (process.env.STORYBOOK_CI === 'true') {
    return LokiDelayDecorator()(StoryComponent)
  }

  return <StoryComponent />
}
