import { BrowserRouter } from 'react-router-dom'
import type { StoryFn } from '@storybook/react'

export const RouterDecorator = (StoryComponent: StoryFn) => {
  return (
    <BrowserRouter>
      <StoryComponent />
    </BrowserRouter>
  )
}
