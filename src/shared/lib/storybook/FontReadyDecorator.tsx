import type { StoryFn } from '@storybook/react'
// @ts-expect-error - no types
import createAsyncCallback from '@loki/create-async-callback'
import isLokiRunning from '@loki/is-loki-running'

/**
 * Waits until the font is loaded until making loki screenshots
 * @param StoryComponent
 * @returns
 */
export const FontReadyDecorator = (StoryComponent: StoryFn) => {
  const onDone = createAsyncCallback()

  if (isLokiRunning()) {
    window.document.fonts.ready.then(() => {
      onDone()
    })
  }

  return <StoryComponent />
}
