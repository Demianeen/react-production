import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { article } from 'entities/Article/model/mocks/tests'
import ArticleDetailsPage from './ArticleDetailsPage'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as ComponentMeta<typeof ArticleDetailsPage>

const Template: ComponentStory<typeof ArticleDetailsPage> =
  (args) => <ArticleDetailsPage {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [
  StoreDecorator({
    articleDetails: {
      data: article,
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {}
Red.decorators = [ThemeDecorator(Theme.RED)]
