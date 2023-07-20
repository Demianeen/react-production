import type { Meta, StoryObj } from '@storybook/react'
import { View } from '@/entities/ListFilters'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { mockArticle } from '../../model/mocks/mockArticle'
import type { ArticleListProps } from './ArticleList'
import { ArticleList } from './ArticleList'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // it needs more time to load than normal because it has a lot of images to load
  decorators: [LokiDelayDecorator(10000)],
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

const listArgs: ArticleListProps = {
  articles: articlesList,
  view: View.LIST,
  isLoading: false,
}

export const ListDeprecated: Story = {
  args: listArgs,
}

export const ListRedesigned: Story = {
  args: listArgs,
}

const gridArgs: ArticleListProps = {
  isLoading: false,
  articles: articlesGrid,
  view: View.GRID,
}

export const GridDeprecated: Story = {
  args: gridArgs,
}

export const GridRedesigned: Story = {
  args: gridArgs,
}

const isLoadingListArgs: ArticleListProps = {
  articles: articlesList,
  isLoading: true,
  view: View.LIST,
}

export const IsLoadingListDeprecated: Story = {
  args: isLoadingListArgs,
}

export const IsLoadingListRedesigned: Story = {
  args: isLoadingListArgs,
}

const isLoadingGridArgs: ArticleListProps = {
  articles: articlesGrid,
  isLoading: true,
  view: View.GRID,
}

export const IsLoadingGridDeprecated: Story = {
  args: isLoadingGridArgs,
}

export const IsLoadingGridRedesigned: Story = {
  args: isLoadingGridArgs,
}
