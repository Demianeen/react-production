import type { Meta, StoryObj } from '@storybook/react'
import { RatingCardSkeletonRedesigned } from './RatingCardSkeletonRedesigned'

export default {
  title: 'entities/Rating/RatingCard/redesigned',
  component: RatingCardSkeletonRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof RatingCardSkeletonRedesigned>

type Story = StoryObj<typeof RatingCardSkeletonRedesigned>

export const Skeleton: Story = {}
