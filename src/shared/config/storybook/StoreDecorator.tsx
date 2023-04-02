import type { Story } from '@storybook/react'
import { StoreProvider } from 'app/providers/StoreProvider'

export const StoreDecorator = (StoryComponent: Story) => {
  return (
    <StoreProvider>
      <StoryComponent />
    </StoreProvider>
  )
}
