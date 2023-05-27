import { withRouter } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react'
import {
  initialize,
  mswDecorator,
} from 'msw-storybook-addon'
import { articleDetailsHandlers } from '../../src/entities/Article/model/mocks/articleDetailsHandlers'
import { commentHandlers } from '../../src/entities/Comment/model/mocks/commentHandlers'
import { imageHandlers } from '../../src/shared/lib/mock-server/imageHandlers'
import { notificationHandlers } from '../../src/entities/Notification/model/mocks/notificationHandlers'
import { StyleDecorator } from '../../src/shared/lib/storybook/StyleDecorator'
import { SuspenseDecorator } from '../../src/shared/lib/storybook/SuspenseDecorator'
import { ThemeDecorator } from '../../src/shared/lib/storybook/ThemeDecorator'
import { profileHandlers } from '../../src/entities/Profile/mocks/profileHandlers'
import { articleHandlers } from '../../src/entities/Article/model/mocks/articleHandlers'
import { Theme } from '../../src/app/providers/ThemeProvider'
import { ratingHandlers } from '../../src/entities/Rating/model/mocks/ratingHandlers'

// Initialize MSW
initialize({})

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
        articles: articleHandlers,
        articleDetails: articleDetailsHandlers,
        comments: commentHandlers,
        image: imageHandlers,
        notification: notificationHandlers,
        rating: ratingHandlers,
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
