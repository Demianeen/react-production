import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { View } from 'entities/View'
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
} as ComponentMeta<typeof ArticleListSkeleton>

const Template: ComponentStory<typeof ArticleListSkeleton> =
  (args) => <ArticleListSkeleton {...args} />

const listContext = {
  isLoading: true,
  view: View.LIST,
  limit: 4,
}

const gridContext = {
  isLoading: true,
  view: View.GRID,
  limit: 12,
}

export const List = Template.bind({})
List.args = {
  context: listContext,
}

export const Grid = Template.bind({})
Grid.args = {
  context: gridContext,
}

export const Dark = Template.bind({})
Dark.args = {
  context: listContext,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
  context: listContext,
}
Red.decorators = [ThemeDecorator(Theme.RED)]
