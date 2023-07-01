import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { RoutePath } from '@/shared/const/router/routePath'
import { routes } from '@/shared/lib/router/routes'
import ArticleDetailsPage from './ArticleDetailsPage'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  parameters: {
    reactRouter: {
      routePath: RoutePath.articleDetails,
      routeParams: { id: '1' },
    },
  },
} as Meta<typeof ArticleDetailsPage>

type Story = StoryObj<typeof ArticleDetailsPage>

export const Light: Story = {
  decorators: [],
}

export const NotFound: Story = {
  parameters: {
    reactRouter: {
      routePath: routes.articleDetails({ id: '' }),
    },
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
