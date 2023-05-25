import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/ListFilters'
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { mockArticle } from '../../model/mocks/data'
import { ArticleListItem } from './ArticleListItem'

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    article: mockArticle,
  },
} as Meta<typeof ArticleListItem>

type Story = StoryObj<typeof ArticleListItem>

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
