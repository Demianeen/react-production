import type { StoryFn } from '@storybook/react'
// @ts-expect-error - no types
import createAsyncCallback from '@loki/create-async-callback'
// @ts-expect-error - no types
import isLokiRunning from '@loki/is-loki-running'

const DEFAULT_DELAY = 6000
/**
 * Makes a delay between capturing a screenshot. Useful when you need to wait until some async actions are done or image is loaded.
 * @param delay - Delay in milliseconds.
 * @default 6000 - 6 seconds.
 */
export const LokiDelayDecorator = (delay = DEFAULT_DELAY) =>
  function Decorator(StoryComponent: StoryFn) {
    const onDone = createAsyncCallback()

    if (isLokiRunning()) {
      setTimeout(() => {
        onDone()
      }, delay)
    }

    return <StoryComponent />
  }
