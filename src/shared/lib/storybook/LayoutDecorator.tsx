import type { StoryFn } from '@storybook/react'
import { HStack } from '@/shared/ui/deprecated/Stack'

export const LayoutDecorator = (layout: 'centered' | 'fullpage') =>
  function Decorator(StoryComponent: StoryFn) {
    if (layout === 'centered') {
      return (
        <HStack justify='center' align='center' maxWidth maxHeight>
          <StoryComponent />
        </HStack>
      )
    }

    if (layout === 'fullpage') {
      return (
        <div style={{ height: '100vh' }}>
          <StoryComponent />
        </div>
      )
    }

    return <StoryComponent />
  }
