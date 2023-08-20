import type { StoryContext, StoryFn } from '@storybook/react'
import { Theme } from '@/shared/const/theme'

export const ThemeDecorator = (theme?: Theme) =>
  function Decorator(
    StoryComponent: StoryFn,
    { globals: { theme: defaultTheme }, name }: StoryContext
  ) {
    document.body.classList.remove(
      Theme.LIGHT,
      Theme.DARK,
      Theme.ORANGE
    )

    document.body.classList.add(theme ?? defaultTheme)

    return <StoryComponent />
  }
