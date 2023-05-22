import type { ReactNode } from 'react'
import { HStack } from 'shared/ui/Stack'
import type { StoryFn } from '@storybook/react'

export const LayoutDecorator = (layout: 'centered') =>
  function Decorator(StoryComponent: StoryFn) {
    let content: ReactNode

    if (layout === 'centered') {
      content = (
        <HStack
          justify='center'
          align='center'
          maxWidth
          maxHeight
        >
          <StoryComponent />
        </HStack>
      )
    }

    return <>{content}</> ?? <StoryComponent />
  }
