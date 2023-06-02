import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticleInfiniteListFilters } from './ArticleInfiniteListFilters'

export default {
  title:
    'widgets/ArticleInfiniteList/ArticleInfiniteListFilters',
  component: ArticleInfiniteListFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ArticleInfiniteListFilters>

type Story = StoryObj<typeof ArticleInfiniteListFilters>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
