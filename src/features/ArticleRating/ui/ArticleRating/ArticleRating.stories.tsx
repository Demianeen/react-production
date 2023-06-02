import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
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
  decorators: [InitUserDecorator(), StoreDecorator()],
} as Meta<typeof ArticleRating>

type Story = StoryObj<typeof ArticleRating>

export const Rated: Story = {}

export const Unrated: Story = {}

export const Loading: Story = {}

export const Error: Story = {}
