import type { Theme } from 'app/providers/ThemeProvider'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import type { StoryFn } from '@storybook/react'

export const ThemeDecorator = (theme: Theme) =>
  function Decorator(StoryComponent: StoryFn) {
    return (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <StoryComponent />
        </div>
      </ThemeProvider>
    )
  }
