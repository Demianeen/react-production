import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { article } from 'entities/Article/model/mocks/tests'
import { ArticleView } from 'entities/Article'
import { ArticleListItem } from './ArticleListItem'

export default {
  title: 'entities/Article/ArticleListItem',
  component: ArticleListItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    article,
  },
} as ComponentMeta<typeof ArticleListItem>

const Template: ComponentStory<typeof ArticleListItem> = (
  args
) => <ArticleListItem {...args} />

export const List = Template.bind({})
List.args = {
  view: ArticleView.LIST,
}

export const Grid = Template.bind({})
Grid.args = {
  view: ArticleView.GRID,
}

export const DarkList = Template.bind({})
DarkList.args = {
  view: ArticleView.LIST,
}
DarkList.decorators = [ThemeDecorator(Theme.DARK)]

export const DarkGrid = Template.bind({})
DarkGrid.args = {
  view: ArticleView.GRID,
}
DarkGrid.decorators = [ThemeDecorator(Theme.DARK)]

export const RedList = Template.bind({})
RedList.args = {
  view: ArticleView.LIST,
}
RedList.decorators = [ThemeDecorator(Theme.RED)]

export const RedGrid = Template.bind({})
RedGrid.args = {
  view: ArticleView.GRID,
}
RedGrid.decorators = [ThemeDecorator(Theme.RED)]
