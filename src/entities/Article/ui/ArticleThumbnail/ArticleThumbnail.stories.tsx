import type { StoryObj, Meta } from '@storybook/react'
import ArticleImage from '@/shared/assets/mocks/article.png'
import { ArticleThumbnail } from './ArticleThumbnail'

export default {
  title: 'entities/Article/ArticleThumbnail',
  component: ArticleThumbnail,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: ArticleImage,
  },
} as Meta<typeof ArticleThumbnail>

type Story = StoryObj<typeof ArticleThumbnail>

export const Primary: Story = {
  args: {},
}

export const Loading: Story = {
  args: {
    src: 'https://mockapi.com/article-image/loading',
  },
}
