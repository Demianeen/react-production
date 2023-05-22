import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { View } from 'entities/ListFilters'
import { ArticleListSkeleton } from './ArticleListSkeleton'

export default {
  title: 'entities/Article/ArticleListSkeleton',
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

export const List: Story = {
  args: {
    context: listContext,
  },
}

export const Grid: Story = {
  args: {
    context: gridContext,
  },
}

export const Dark: Story = {
  args: {
    context: listContext,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  args: {
    context: listContext,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
