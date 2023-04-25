import type { Story } from '@storybook/react'
import type { Theme } from '../../contexts/theme-context'
import { ThemeProvider } from '../../contexts/theme-context'

export const ThemeDecorator = (theme: Theme) =>
  function (StoryComponent: Story) {
    document.body.className = theme
    return (
      <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
          <StoryComponent />
        </div>
      </ThemeProvider>
    )
  }
