import type { Meta, StoryObj } from '@storybook/react'
import ArticleImage from '@/shared/assets/mocks/article.png'
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
  parameters: {},
} as Meta<typeof CreateArticle>

type Story = StoryObj<typeof CreateArticle>

export const Light: Story = {}
