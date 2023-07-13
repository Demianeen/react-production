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

export const RatedDeprecated: Story = {}
export const RatedRedesigned: Story = {}

export const UnratedDeprecated: Story = {}
export const UnratedRedesigned: Story = {}

export const LoadingDeprecated: Story = {}
export const LoadingRedesigned: Story = {}

export const ErrorDeprecated: Story = {}
export const ErrorRedesigned: Story = {}
