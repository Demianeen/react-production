import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { ArticleRecommendationsList } from './ArticleRecommendationsList'

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
  parameters: {
    loki: {
      // FIXME: Add mock data to RTK Query
      skip: true,
    },
  },
} as ComponentMeta<typeof ArticleRecommendationsList>

const Template: ComponentStory<
  typeof ArticleRecommendationsList
> = (args) => <ArticleRecommendationsList {...args} />

export const Light = Template.bind({})
Light.args = {}
