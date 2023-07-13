import type { StoryContext, StoryFn } from '@storybook/react'
import { Theme } from '@/shared/const/theme'
import { useLayoutEffect } from 'react'

export const ThemeDecorator = (theme?: Theme) =>
  function Decorator(
    StoryComponent: StoryFn,
    { globals: { theme: defaultTheme } }: StoryContext
  ) {
    useLayoutEffect(() => {
      document.body.classList.remove(
        Theme.LIGHT,
        Theme.DARK,
        Theme.ORANGE
      )

      document.body.classList.add(theme ?? defaultTheme)
    }, [defaultTheme])

    return <StoryComponent />
  }
