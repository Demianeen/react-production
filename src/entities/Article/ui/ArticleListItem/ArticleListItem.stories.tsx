import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { View } from 'entities/ListFilters'
import { article } from '../../model/mocks/tests'
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
  view: View.LIST,
}

export const Grid = Template.bind({})
Grid.args = {
  view: View.GRID,
}

export const DarkList = Template.bind({})
DarkList.args = {
  view: View.LIST,
}
DarkList.decorators = [ThemeDecorator(Theme.DARK)]

export const DarkGrid = Template.bind({})
DarkGrid.args = {
  view: View.GRID,
}
DarkGrid.decorators = [ThemeDecorator(Theme.DARK)]

export const RedList = Template.bind({})
RedList.args = {
  view: View.LIST,
}
RedList.decorators = [ThemeDecorator(Theme.RED)]

export const RedGrid = Template.bind({})
RedGrid.args = {
  view: View.GRID,
}
RedGrid.decorators = [ThemeDecorator(Theme.RED)]
