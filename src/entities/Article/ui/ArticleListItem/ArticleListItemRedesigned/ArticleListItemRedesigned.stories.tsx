import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/View'
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { mockArticle } from '../../../model/mocks/mockArticle'
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned'

export default {
  title: 'entities/Article/ArticleListItem/redesigned',
  component: ArticleListItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    article: mockArticle,
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleListItemRedesigned>

type Story = StoryObj<typeof ArticleListItemRedesigned>

export const List: Story = {
  args: {
    view: View.LIST,
  },
}

export const Grid: Story = {
  args: {
    view: View.GRID,
  },
  decorators: [ParentDecorator({ parentWidth: '15rem' })],
}
