import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { mockArticle } from '@/entities/Article/model/mocks/data'
import { RoutePath } from '@/shared/config/routeConfig/routePath'
import ArticleDetailsPage from './ArticleDetailsPage'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
  parameters: {
    reactRouter: {
      routePath: `${RoutePath.article_details}:id`,
      routeParams: { id: '1' },
    },
  },
} as Meta<typeof ArticleDetailsPage>

type Story = StoryObj<typeof ArticleDetailsPage>
export const Light: Story = {
  decorators: [
    StoreDecorator({
      articleDetails: {
        data: mockArticle,
      },
    }),
  ],
}

export const NotFound: Story = {
  decorators: [StoreDecorator()],
  parameters: {
    reactRouter: {
      routePath: `${RoutePath.article_details}`,
    },
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
