import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { article } from '../../model/mocks/tests'
import { ArticleDetails } from './ArticleDetails'

export default {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetails>

const Template: ComponentStory<typeof ArticleDetails> = (
  args
) => <ArticleDetails {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
  StoreDecorator({
    articleDetails: {
      isLoading: true,
    },
  }),
]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
  StoreDecorator({
    articleDetails: {
      error: 'Error',
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
Dark.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
Red.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
]
