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
import { profileHandlers } from '../../src/entities/Profile/model/mocks/profileHandlers'
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
        articleDetails: articleDetailsHandlers,
        articles: articleHandlers,
        comments: commentHandlers,
        image: imageHandlers,
        notification: notificationHandlers,
        rating: ratingHandlers,
      },
    },
    loki: {
      delay: 1000,
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
