import { withRouter } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { userHandlers } from '@/entities/User/testing'
import { I18NextDecorator } from '@/shared/lib/storybook/I18NextDecorator'
import { articleDetailsHandlers } from '../../src/entities/Article/model/mocks/articleDetailsHandlers'
import { commentHandlers } from '../../src/entities/Comment/model/mocks/commentHandlers'
import { imageHandlers } from '../../src/shared/lib/mock-server/imageHandlers'
import { notificationHandlers } from '../../src/entities/Notification/model/mocks/notificationHandlers'
import { StyleDecorator } from '../../src/shared/lib/storybook/StyleDecorator'
import { SuspenseDecorator } from '../../src/shared/lib/storybook/SuspenseDecorator'
import { profileHandlers } from '../../src/entities/Profile/model/mocks/profileHandlers'
import { articleHandlers } from '../../src/entities/Article/model/mocks/articleHandlers'
import { ratingHandlers } from '../../src/entities/Rating/model/mocks/ratingHandlers'
import { Theme } from '../../src/shared/const/theme'

// Initialize MSW
initialize({
  onUnhandledRequest(request) {
    const url = request.url.pathname

    if (url.includes('localhost') || url.includes('mockapi.com'))
      console.error(
        `Found an unhandled ${request.method} request to ${url}`
      )
  },
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
        rating: ratingHandlers,
        user: userHandlers,
      },
    },
    themes: {
      default: 'light',
      list: [
        {
          name: 'light',
          class: ['app', Theme.LIGHT],
          color: '#fffbfe',
        },
        {
          name: 'dark',
          class: ['app', Theme.DARK],
          color: '#1c1b1f',
        },
        {
          name: 'red',
          class: ['app', Theme.RED],
          color: '#de2560',
        },
      ],
    },
  },
  decorators: [
    StyleDecorator,
    withRouter,
    mswDecorator,
    SuspenseDecorator,
    InitUserDecorator(2),
    StoreDecorator(),
    I18NextDecorator,
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ua', title: 'Ukrainian' },
        ],
        showName: false,
      },
    },
  },
}

export default preview
