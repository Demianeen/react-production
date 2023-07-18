import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { RoutePath } from '@/shared/const/router/routePath'
import { routes } from '@/shared/lib/router/routes'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import ArticleDetailsPageDeprecated from './ArticleDetailsPageDeprecated'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage/deprecated',
  component: ArticleDetailsPageDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },

  parameters: {
    reactRouter: {
      routePath: RoutePath.articleDetails,
      routeParams: { id: '1' },
    },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleDetailsPageDeprecated>

type Story = StoryObj<typeof ArticleDetailsPageDeprecated>

export const Light: Story = {
  decorators: [],
}

export const NotFound: Story = {
  decorators: [LayoutDecorator('fullpage')],
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
