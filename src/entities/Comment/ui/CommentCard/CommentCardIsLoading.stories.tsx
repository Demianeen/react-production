import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { CommentCardIsLoading } from './CommentCardIsLoading'

export default {
  title: 'entities/Comment/CommentCardIsLoading',
  component: CommentCardIsLoading,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CommentCardIsLoading>

type Story = StoryObj<typeof CommentCardIsLoading>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
