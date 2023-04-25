import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { ArticleView } from 'entities/Article'
import { ArticleListItemSkeleton } from './ArticleListItemSkeleton'

export default {
  title: 'entities/Article/ArticleListItemSkeleton',
  component: ArticleListItemSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleListItemSkeleton>

const Template: ComponentStory<
  typeof ArticleListItemSkeleton
> = (args) => <ArticleListItemSkeleton {...args} />

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
