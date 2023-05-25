import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/ListFilters'
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton'

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItemSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListItemSkeleton>

type Story = StoryObj<typeof ArticleListItemSkeleton>

export const ListSkeleton: Story = {
  args: {
    view: View.LIST,
  },
}

export const GridSkeleton: Story = {
  args: {
    view: View.GRID,
  },
  decorators: [ParentDecorator({ parentWidth: '15rem' })],
}
