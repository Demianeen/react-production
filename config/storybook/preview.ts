import { withRouter } from 'storybook-addon-react-router-v6'
import type { Preview } from '@storybook/react'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { userHandlers } from '@/entities/User/testing'
import { I18NextDecorator } from '@/shared/lib/storybook/I18NextDecorator'
import { ToggleDesignDecorator } from '@/shared/lib/storybook/ToggleDesignDecorator'
import { Theme } from '@/shared/const/theme'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { AppDecorator } from '@/shared/lib/storybook/AppDecorator'
import { CiDelayDecorator } from '@/shared/lib/storybook/CiDelayDecorator'
import { articleDetailsHandlers } from '../../src/entities/Article/model/mocks/articleDetailsHandlers'
import { commentHandlers } from '../../src/entities/Comment/model/mocks/commentHandlers'
import { imageHandlers } from '../../src/shared/lib/mock-server/imageHandlers'
import { notificationHandlers } from '../../src/entities/Notification/model/mocks/notificationHandlers'
import { StyleDecorator } from '../../src/shared/lib/storybook/StyleDecorator'
import { SuspenseDecorator } from '../../src/shared/lib/storybook/SuspenseDecorator'
import { profileHandlers } from '../../src/entities/Profile/model/mocks/profileHandlers'
import { articleHandlers } from '../../src/entities/Article/model/mocks/articleHandlers'
import { ratingHandlers } from '../../src/entities/Rating/model/mocks/ratingHandlers'

// Initialize MSW
initialize({
  onUnhandledRequest: (request) => {
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
    layout: 'fullscreen',
  },
  decorators: [
    CiDelayDecorator,
    AppDecorator,
    StyleDecorator,
    withRouter,
    SuspenseDecorator,
    InitUserDecorator(2),
    ThemeDecorator(),
    ToggleDesignDecorator(),
    StoreDecorator(),
    I18NextDecorator,
    mswDecorator,
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ua', title: 'Ukrainian' },
        ],
        showName: false,
      },
    },
    theme: {
      name: 'Theme',
      description: 'Theme for components',
      defaultValue: Theme.LIGHT,
      toolbar: {
        icon: 'mirror',
        showName: false,
        items: [
          {
            title: 'Light',
            value: Theme.LIGHT,
          },
          {
            title: 'Dark',
            value: Theme.DARK,
          },
          {
            title: 'Orange',
            value: Theme.ORANGE,
          },
        ],
      },
    },
  },
}

export default preview
