import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { action } from '@storybook/addon-actions'
import { View } from 'entities/View'
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
    isLoading: false,
    onLoadNextPart: action('onLoadNextPart'),
  },
  parameters: {
    loki: {
      // storybook throws an error when rendering this component because of virtuoso
      skip: true,
    },
  },
  decorators: [
    StoreDecorator({
      sortedArticleList: {
        view: View.GRID,
      },
    }),
  ],
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
