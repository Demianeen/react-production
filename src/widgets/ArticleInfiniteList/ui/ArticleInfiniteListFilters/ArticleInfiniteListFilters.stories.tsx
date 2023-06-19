import type { Meta, StoryObj } from '@storybook/react'
import { ArticleInfiniteListFilters } from './ArticleInfiniteListFilters'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteListFilters',
  component: ArticleInfiniteListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleInfiniteListFilters>

type Story = StoryObj<typeof ArticleInfiniteListFilters>
export const Light: Story = {}
