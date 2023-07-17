import type { StoryFn } from '@storybook/react'
// @ts-expect-error - no types
import createAsyncCallback from '@loki/create-async-callback'
import { useEffect } from 'react'

const DELAY = 2000
/**
 * Makes a delay between capturing a screenshot.
 */
export const LokiDelayDecorator = (StoryComponent: StoryFn) => {
  const onDone = createAsyncCallback()

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone()
    }, DELAY)

    return () => {
      clearTimeout(timeout)
      onDone()
    }
  }, [onDone])

  return <StoryComponent />
}
