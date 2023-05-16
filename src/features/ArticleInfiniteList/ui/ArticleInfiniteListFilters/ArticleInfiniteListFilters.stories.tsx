import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { ArticleInfiniteListFilters } from './ArticleInfiniteListFilters'

export default {
  title:
    'features/ArticleInfiniteList/ArticleInfiniteListFilters',
  component: ArticleInfiniteListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof ArticleInfiniteListFilters>

const Template: ComponentStory<
  typeof ArticleInfiniteListFilters
> = (args) => <ArticleInfiniteListFilters {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
