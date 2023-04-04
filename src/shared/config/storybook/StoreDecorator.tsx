import type { Story } from '@storybook/react'
import type { StateSchema } from 'app/providers/StoreProvider'
import { StoreProvider } from 'app/providers/StoreProvider'
import type { DeepPartial } from '@reduxjs/toolkit'

export const StoreDecorator = (
  initialState?: DeepPartial<StateSchema>
) =>
  function decorator(StoryComponent: Story) {
    return (
      <StoreProvider initialState={initialState}>
        <StoryComponent />
      </StoreProvider>
    )
  }
