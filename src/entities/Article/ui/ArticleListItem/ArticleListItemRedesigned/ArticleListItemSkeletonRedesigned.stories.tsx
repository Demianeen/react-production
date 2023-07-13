import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/ListFilters'
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { ArticleListItemSkeletonRedesigned } from './ArticleListItemSkeletonRedesigned'

export default {
  title: 'entities/Article/ArticleListItem/redesigned',
  component: ArticleListItemSkeletonRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListItemSkeletonRedesigned>

type Story = StoryObj<typeof ArticleListItemSkeletonRedesigned>

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
