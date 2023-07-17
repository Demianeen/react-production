import type { StoryFn } from '@storybook/react'
// @ts-expect-error - no types
import createAsyncCallback from '@loki/create-async-callback'

const DELAY = 2000
/**
 * Makes a delay between capturing a screenshot.
 */
export const LokiDelayDecorator = (StoryComponent: StoryFn) => {
  const onDone = createAsyncCallback()

  setTimeout(() => {
    onDone()
  }, DELAY)

  return <StoryComponent />
}
