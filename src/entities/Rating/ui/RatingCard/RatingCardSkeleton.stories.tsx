import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { RatingCardSkeleton } from './RatingCardSkeleton'

export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCardSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof RatingCardSkeleton>

type Story = StoryObj<typeof RatingCardSkeleton>

export const Skeleton: Story = {}

export const SquaredSkeleton: Story = {
  args: {
    squared: true,
  },
}
