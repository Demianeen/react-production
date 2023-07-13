import type { Meta, StoryObj } from '@storybook/react'
import { RatingCardSkeletonDeprecated } from './RatingCardSkeletonDeprecated'

export default {
  title: 'entities/Rating/RatingCard/deprecated',
  component: RatingCardSkeletonDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof RatingCardSkeletonDeprecated>

type Story = StoryObj<typeof RatingCardSkeletonDeprecated>

export const Skeleton: Story = {}

export const SquaredSkeleton: Story = {
  args: {
    squared: true,
  },
}
