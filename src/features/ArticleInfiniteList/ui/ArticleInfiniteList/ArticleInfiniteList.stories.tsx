import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import {
  articleIds,
  articles,
  getArticleEntities,
} from '../../model/mocks/data'
import { ArticleInfiniteList } from './ArticleInfiniteList'

export default {
  title: 'features/ArticleInfiniteList/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator({
      articleInfiniteList: {
        entities: getArticleEntities(articles),
        ids: articleIds,
      },
    }),
  ],
} as ComponentMeta<typeof ArticleInfiniteList>

const Template: ComponentStory<typeof ArticleInfiniteList> =
  (args) => <ArticleInfiniteList {...args} />

export const Light = Template.bind({})
Light.args = {}
