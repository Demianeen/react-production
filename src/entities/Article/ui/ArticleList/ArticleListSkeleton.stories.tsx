import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'entities/ListFilters'
import { ArticleListSkeleton } from './ArticleListSkeleton'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleListSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isLoading: true,
  },
} as Meta<typeof ArticleListSkeleton>

type Story = StoryObj<typeof ArticleListSkeleton>
const listContext = {
  isLoading: true,
  view: View.LIST,
  skeletonsLimit: 4,
}

const gridContext = {
  isLoading: true,
  view: View.GRID,
  skeletonsLimit: 12,
}

export const ListSkeleton: Story = {
  args: {
    context: listContext,
  },
}

export const GridSkeleton: Story = {
  args: {
    context: gridContext,
  },
}
