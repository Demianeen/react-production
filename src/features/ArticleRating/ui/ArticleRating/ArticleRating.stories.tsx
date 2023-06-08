import type { Meta, StoryObj } from '@storybook/react'
import ArticleRating from './ArticleRating'

export default {
  title: 'features/ArticleRating',
  component: ArticleRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    articleId: 1,
  },
  parameters: {},
} as Meta<typeof ArticleRating>

type Story = StoryObj<typeof ArticleRating>

export const Rated: Story = {}

export const Unrated: Story = {}

export const Loading: Story = {}

export const Error: Story = {}
