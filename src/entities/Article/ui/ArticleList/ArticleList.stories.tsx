import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { article } from 'entities/Article/model/mocks/tests'
import { View } from 'entities/View'
import { ArticleList } from './ArticleList'

export default {
  title: 'entities/Article/ArticleList',
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleList>

const Template: ComponentStory<typeof ArticleList> = (
  args
) => <ArticleList {...args} />

const articles = new Array(16)
  .fill(null)
  .map((array, index) => ({
    ...article,
    id: index,
  }))

export const List = Template.bind({})
List.args = {
  articles,
  view: View.LIST,
}

export const Grid = Template.bind({})
Grid.args = {
  articles,
  view: View.GRID,
}

export const IsLoadingList = Template.bind({})
IsLoadingList.args = {
  articles: [],
  isLoading: true,
  view: View.LIST,
}

export const IsLoadingGrid = Template.bind({})
IsLoadingGrid.args = {
  articles: [],
  isLoading: true,
  view: View.GRID,
}

export const DarkList = Template.bind({})
DarkList.args = {
  articles,
  view: View.LIST,
}
DarkList.decorators = [ThemeDecorator(Theme.DARK)]

export const DarkGrid = Template.bind({})
DarkGrid.args = {
  articles,
  view: View.GRID,
}
DarkGrid.decorators = [ThemeDecorator(Theme.DARK)]

export const RedList = Template.bind({})
RedList.args = {
  articles,
  view: View.LIST,
}
RedList.decorators = [ThemeDecorator(Theme.RED)]

export const RedGrid = Template.bind({})
RedGrid.args = {
  articles,
  view: View.GRID,
}
RedGrid.decorators = [ThemeDecorator(Theme.RED)]
