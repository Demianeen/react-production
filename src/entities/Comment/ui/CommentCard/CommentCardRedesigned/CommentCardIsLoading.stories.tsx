import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { CommentCardRedesignedSkeleton } from './CommentCardSkeleton'

export default {
  title: 'entities/Comment/CommentCardIsLoading/redesigned',
  component: CommentCardRedesignedSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CommentCardRedesignedSkeleton>

type Story = StoryObj<typeof CommentCardRedesignedSkeleton>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
