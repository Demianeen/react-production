import type { Meta, StoryObj } from '@storybook/react'
import { CiDelayDecorator } from '@/shared/lib/storybook/CiDelayDecorator'
import { RatingCardRedesigned } from './RatingCardRedesigned'

export default {
  title: 'entities/Rating/RatingCard/redesigned',
  component: RatingCardRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    title: 'Rate this article',
    feedbackTitle: 'Tell us what you think',
  },
  decorators: [CiDelayDecorator],
} as Meta<typeof RatingCardRedesigned>

type Story = StoryObj<typeof RatingCardRedesigned>

export const Light: Story = {}
