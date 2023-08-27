import type { StoryFn } from '@storybook/react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { CSSProperties } from 'react'

export const LayoutDecorator =
  (
    layout: 'centered' | 'fullpage' = 'centered',
    style?: CSSProperties
  ) =>
  (StoryComponent: StoryFn) => {
    if (layout === 'centered') {
      return (
        <HStack
          justify='center'
          align='center'
          maxWidth
          style={{
            height: '100svh',
            ...style,
          }}
        >
          <StoryComponent />
        </HStack>
      )
    }

    return (
      <div style={{ height: '100vh', width: '100vw', ...style }}>
        <StoryComponent />
      </div>
    )
  }
