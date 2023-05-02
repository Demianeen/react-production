import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { ArticleDetailsHeader } from './ArticleDetailsHeader'

export default {
  title: 'entities/Article/ArticleDetailsHeader',
  component: ArticleDetailsHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleDetailsHeader>

const Template: ComponentStory<
  typeof ArticleDetailsHeader
> = (args) => <ArticleDetailsHeader {...args} />

const store = {
  articleDetails: {
    data: {
      user: {
        id: 1,
      },
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

export const CanEdit = Template.bind({})
CanEdit.args = {}
CanEdit.decorators = [StoreDecorator(store)]

export const CannotEdit = Template.bind({})
CannotEdit.args = {}
CannotEdit.decorators = [
  StoreDecorator({
    ...store,
    articleDetails: {
      data: {
        user: {
          id: 2,
        },
      },
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator(store),
]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [
  ThemeDecorator(Theme.RED),
  StoreDecorator(store),
]
