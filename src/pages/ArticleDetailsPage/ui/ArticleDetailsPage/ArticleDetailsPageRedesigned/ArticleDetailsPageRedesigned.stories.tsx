import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { RoutePath } from '@/shared/const/router/routePath'
import { routes } from '@/shared/lib/router/routes'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import ArticleDetailsPageRedesigned from './ArticleDetailsPageRedesigned'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage/redesigned',
  component: ArticleDetailsPageRedesigned,
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
} as Meta<typeof ArticleDetailsPageRedesigned>

type Story = StoryObj<typeof ArticleDetailsPageRedesigned>

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
