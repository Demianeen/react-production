import type { Meta, StoryObj } from '@storybook/react'
import { View } from 'entities/ListFilters'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton'

export default {
  title: 'entities/Article/ArticleListItemSkeleton',
  component: ArticleListItemSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleListItemSkeleton>

type Story = StoryObj<typeof ArticleListItemSkeleton>
export const List: Story = {
  args: {
    view: View.LIST,
  },
}

export const Grid: Story = {
  args: {
    view: View.GRID,
  },
}

export const DarkList: Story = {
  args: {
    view: View.LIST,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const DarkGrid: Story = {
  args: {
    view: View.GRID,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const RedList: Story = {
  args: {
    view: View.LIST,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}

export const RedGrid: Story = {
  args: {
    view: View.GRID,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
