import { withRouter } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'
import {
  initialize,
  mswDecorator,
} from 'msw-storybook-addon'
import { notificationHandlers } from 'entities/Notification/mocks/notificationHandlers'
import { StyleDecorator } from '../../src/shared/lib/storybook/StyleDecorator'
import { SuspenseDecorator } from '../../src/shared/lib/storybook/SuspenseDecorator'
import { ThemeDecorator } from '../../src/shared/lib/storybook/ThemeDecorator'
import { commentHandlers } from '../../src/entities/Comment'
import { imageHandlers } from '../../src/shared/lib/mock-server/imageHandlers'
import {
  articleDetailsHandlers,
  articleHandlers,
} from '../../src/entities/Article'
import { profileHandlers } from '../../src/entities/Profile'

// Initialize MSW
initialize({
  onUnhandledRequest: 'bypass',
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers: {
        profile: profileHandlers,
        articleDetails: articleDetailsHandlers,
        articles: articleHandlers,
        comments: commentHandlers,
        image: imageHandlers,
        notification: notificationHandlers,
      },
    },
  },
  decorators: [
    StyleDecorator,
    withRouter,
    mswDecorator,
    SuspenseDecorator,
    ThemeDecorator(Theme.LIGHT),
  ],
}

export default preview

// load fonts
const links = [
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Fira+Code&display=swap',
  },
]

// to prevent duplication with HMR
function isLinkExist(option: any) {
  return !!document.querySelector(
    `link[href='${option.href}']`
  )
}

function insertLink(options: any) {
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
