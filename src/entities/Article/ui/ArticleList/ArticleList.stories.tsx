import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { View } from '@/entities/ListFilters'
import { mockArticle } from '../../model/mocks/mockArticle'
import { ArticleList } from './ArticleList'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleList>

type Story = StoryObj<typeof ArticleList>
const articlesGrid = new Array(12)
  .fill(null)
  .map((array, index) => ({
    ...mockArticle,
    id: index,
  }))

const articlesList = new Array(2)
  .fill(null)
  .map((array, index) => ({
    ...mockArticle,
    id: index,
  }))

export const List: Story = {
  args: {
    articles: articlesList,
    view: View.LIST,
    limit: 4,
  },
}

export const Grid: Story = {
  args: {
    articles: articlesGrid,
    view: View.GRID,
    limit: 12,
  },
}

export const IsLoadingList: Story = {
  args: {
    articles: articlesList,
    isLoading: true,
    view: View.LIST,
    limit: 4,
  },
}

export const IsLoadingGrid: Story = {
  args: {
    articles: articlesGrid,
    isLoading: true,
    view: View.GRID,
    limit: 12,
  },
}

export const DarkList: Story = {
  args: {
    articles: articlesList,
    view: View.LIST,
    limit: 4,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const DarkGrid: Story = {
  args: {
    articles: articlesGrid,
    view: View.GRID,
    limit: 12,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const RedList: Story = {
  args: {
    articles: articlesList,
    view: View.LIST,
    limit: 4,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}

export const RedGrid: Story = {
  args: {
    articles: articlesGrid,
    view: View.GRID,
    limit: 12,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
