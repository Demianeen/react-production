import type { StoryFn } from '@storybook/react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { CSSProperties } from 'react'

export const LayoutDecorator = (
  layout: 'centered' | 'fullpage',
  style?: CSSProperties
) =>
  function Decorator(StoryComponent: StoryFn) {
    if (layout === 'centered') {
      return (
        <HStack
          justify='center'
          align='center'
          maxWidth
          maxHeight
          style={style}
        >
          <StoryComponent />
        </HStack>
      )
    }

    if (layout === 'fullpage') {
      return (
        <div style={{ height: '100vh', width: '100vw', ...style }}>
          <StoryComponent />
        </div>
      )
    }

    return <StoryComponent />
  }
