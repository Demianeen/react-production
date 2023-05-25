import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import {
  articleIds,
  getArticleEntities,
} from '@/features/ArticleInfiniteList/model/mocks/data'
import ArticlesPage from './ArticlesPage'

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    loki: {
      // storybook throws an error when rendering this component because of virtuoso
      skip: true,
    },
  },
  decorators: [
    StoreDecorator({
      articleInfiniteList: {
        ids: articleIds,
        entities: getArticleEntities(),
      },
    }),
  ],
} as Meta<typeof ArticlesPage>

type Story = StoryObj<typeof ArticlesPage>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
