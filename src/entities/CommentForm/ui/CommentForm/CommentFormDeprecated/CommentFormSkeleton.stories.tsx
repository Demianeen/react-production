import type { Meta, StoryObj } from '@storybook/react'
import { CommentFormDeprecatedSkeleton } from './CommentFormSkeleton'

export default {
  title: 'entities/CommentForm',
  component: CommentFormDeprecatedSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof CommentFormDeprecatedSkeleton>

type Story = StoryObj<typeof CommentFormDeprecatedSkeleton>

export const Skeleton: Story = {}
