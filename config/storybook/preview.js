import { addDecorator } from '@storybook/react'
import { StyleDecorator } from '../../src/shared/lib/storybook/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/lib/storybook/ThemeDecorator'
import { Theme } from '../../src/app/providers/ThemeProvider'
import { RouterDecorator } from '../../src/shared/lib/storybook/RouterDecorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

addDecorator(StyleDecorator)
addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(RouterDecorator)
