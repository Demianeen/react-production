import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { CommentCardDeprecatedSkeleton } from './CommentCardSkeleton'

export default {
  title: 'entities/Comment/CommentCardIsLoading',
  component: CommentCardDeprecatedSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CommentCardDeprecatedSkeleton>

type Story = StoryObj<typeof CommentCardDeprecatedSkeleton>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
