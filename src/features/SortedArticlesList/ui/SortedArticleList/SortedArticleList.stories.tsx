import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { SortedArticleList } from './SortedArticleList'
import { articles } from '../../model/mocks/data'

export default {
  title: 'features/SortedArticleList/SortedArticleList',
  component: SortedArticleList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    articles,
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof SortedArticleList>

const Template: ComponentStory<typeof SortedArticleList> = (
  args
) => <SortedArticleList {...args} />

export const Light = Template.bind({})
Light.args = {}

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
