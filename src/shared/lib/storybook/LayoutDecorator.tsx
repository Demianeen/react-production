import type { Story } from '@storybook/react'
import type { ReactNode } from 'react'
import { HStack } from 'shared/ui/Stack'

export const LayoutDecorator = (layout: 'centered') =>
  function Decorator(StoryComponent: Story) {
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
