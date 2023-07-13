import type { Meta, StoryObj } from '@storybook/react'
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
const articlesGrid = new Array(12).fill(null).map((array, index) => ({
  ...mockArticle,
  id: index,
}))

const articlesList = new Array(2).fill(null).map((array, index) => ({
  ...mockArticle,
  id: index,
}))

const listArgs = {
  articles: articlesList,
  view: View.LIST,
  limit: 4,
}

export const ListDeprecated: Story = {
  args: listArgs,
}

export const ListRedesigned: Story = {
  args: listArgs,
}

const gridArgs = {
  articles: articlesGrid,
  view: View.GRID,
  limit: 12,
}

export const GridDeprecated: Story = {
  args: gridArgs,
}

export const GridRedesigned: Story = {
  args: gridArgs,
}

const isLoadingListArgs = {
  articles: articlesList,
  isLoading: true,
  view: View.LIST,
  limit: 4,
}

export const IsLoadingListDeprecated: Story = {
  args: isLoadingListArgs,
}

export const IsLoadingListRedesigned: Story = {
  args: isLoadingListArgs,
}

const isLoadingGridArgs = {
  articles: articlesGrid,
  isLoading: true,
  view: View.GRID,
  limit: 12,
}

export const IsLoadingGridDeprecated: Story = {
  args: isLoadingGridArgs,
}

export const IsLoadingGridRedesigned: Story = {
  args: isLoadingGridArgs,
}
