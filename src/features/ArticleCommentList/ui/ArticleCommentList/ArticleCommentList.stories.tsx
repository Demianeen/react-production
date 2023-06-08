import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleCommentList } from './ArticleCommentList'

export default {
  title: 'features/ArticleCommentList',
  component: ArticleCommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as Meta<typeof ArticleCommentList>

type Story = StoryObj<typeof ArticleCommentList>

export const Light: Story = {}

export const Loading: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
