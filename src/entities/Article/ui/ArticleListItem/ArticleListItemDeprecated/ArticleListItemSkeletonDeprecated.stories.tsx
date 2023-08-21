import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/View'
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { ArticleListItemSkeletonDeprecated } from './ArticleListItemSkeletonDeprecated'

export default {
  title: 'entities/Article/ArticleListItem/deprecated',
  component: ArticleListItemSkeletonDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListItemSkeletonDeprecated>

type Story = StoryObj<typeof ArticleListItemSkeletonDeprecated>

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
