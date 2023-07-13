import type { Meta, StoryObj } from '@storybook/react'
import { CommentFormRedesignedSkeleton } from './CommentFormSkeleton'

export default {
  title: 'entities/CommentForm/redesigned',
  component: CommentFormRedesignedSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof CommentFormRedesignedSkeleton>

type Story = StoryObj<typeof CommentFormRedesignedSkeleton>

export const Skeleton: Story = {}
