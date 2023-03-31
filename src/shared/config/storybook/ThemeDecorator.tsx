import { Story } from '@storybook/react'
import {
  Theme,
  ThemeProvider,
} from 'app/providers/ThemeProvider'

export const ThemeDecorator = (theme: Theme) =>
  function decorator(StoryComponent: Story) {
    return (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <StoryComponent />
        </div>
      </ThemeProvider>
    )
  }
