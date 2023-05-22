import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { View } from 'entities/ListFilters'
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
