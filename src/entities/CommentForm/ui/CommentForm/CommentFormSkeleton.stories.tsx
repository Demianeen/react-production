import type { Meta, StoryObj } from '@storybook/react'
import { CommentFormSkeleton } from './CommentFormSkeleton'

export default {
  title: 'entities/CommentForm',
  component: CommentFormSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof CommentFormSkeleton>

type Story = StoryObj<typeof CommentFormSkeleton>

export const Skeleton: Story = {}
