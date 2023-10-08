import type { Meta, StoryObj } from '@storybook/react'
import ArticleImage from '@/shared/assets/mocks/article.png'
import { mockArticle } from '@/entities/Article/testing'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { CreateArticle } from './CreateArticle'

export default {
  title: 'pages/CreateArticlePage/CreateArticle',
  component: CreateArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: ArticleImage,
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof CreateArticle>

type Story = StoryObj<typeof CreateArticle>

export const Light: Story = {}

export const EditArticle: Story = {
  args: {
    editArticle: mockArticle,
  },
}
