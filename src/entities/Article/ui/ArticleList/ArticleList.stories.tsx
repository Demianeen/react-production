import type { ComponentStory, Meta } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { View } from 'entities/ListFilters'
import { article } from '../../model/mocks/data'
import { ArticleList } from './ArticleList'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleList>

const Template: ComponentStory<typeof ArticleList> = (
  args
) => <ArticleList {...args} />

const articlesGrid = new Array(12)
  .fill(null)
  .map((array, index) => ({
    ...article,
    id: index,
  }))

const articlesList = new Array(2)
  .fill(null)
  .map((array, index) => ({
    ...article,
    id: index,
  }))

export const List = Template.bind({})
List.args = {
  articles: articlesList,
  view: View.LIST,
  limit: 4,
}

export const Grid = Template.bind({})
Grid.args = {
  articles: articlesGrid,
  view: View.GRID,
  limit: 12,
}

export const IsLoadingList = Template.bind({})
IsLoadingList.args = {
  articles: articlesList,
  isLoading: true,
  view: View.LIST,
  limit: 4,
}

export const IsLoadingGrid = Template.bind({})
IsLoadingGrid.args = {
  articles: articlesGrid,
  isLoading: true,
  view: View.GRID,
  limit: 12,
}

export const DarkList = Template.bind({})
DarkList.args = {
  articles: articlesList,
  view: View.LIST,
  limit: 4,
}
DarkList.decorators = [ThemeDecorator(Theme.DARK)]

export const DarkGrid = Template.bind({})
DarkGrid.args = {
  articles: articlesGrid,
  view: View.GRID,
  limit: 12,
}
DarkGrid.decorators = [ThemeDecorator(Theme.DARK)]

export const RedList = Template.bind({})
RedList.args = {
  articles: articlesList,
  view: View.LIST,
  limit: 4,
}
RedList.decorators = [ThemeDecorator(Theme.RED)]

export const RedGrid = Template.bind({})
RedGrid.args = {
  articles: articlesGrid,
  view: View.GRID,
  limit: 12,
}
RedGrid.decorators = [ThemeDecorator(Theme.RED)]
