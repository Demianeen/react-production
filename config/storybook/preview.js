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

// load fonts
const links = [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
  },
]

// to prevent duplication with HMR
function isLinkExist(option) {
  return !!document.querySelector(
    `link[href='${option.href}']`
  )
}

function insertLink(options) {
  const link = document.createElement('link')
  Object.assign(link, options)

  document.head.insertBefore(
    link,
    document.head.firstElementChild
  )
}

export function loadGlobalStyles() {
  links.forEach((link) =>
    isLinkExist(link) ? null : insertLink(link)
  )
}

loadGlobalStyles()
