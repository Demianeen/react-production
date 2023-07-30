import { VStack } from '@/shared/ui/redesigned/Stack'
import type { StoryFn } from '@storybook/react'

/**
 * Wraps story components with the div with id `app`. It is useful for components that are using `Portal` component as they will render inside storybook root element, and therefore loki will find them.
 */
export const AppDecorator = (StoryComponent: StoryFn) => {
  return (
    <VStack id='app' maxHeight maxWidth>
      <StoryComponent />
    </VStack>
  )
}
