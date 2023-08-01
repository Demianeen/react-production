import type { Meta, StoryObj } from '@storybook/react'
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
  parameters: {},
} as Meta<typeof RatingCardRedesigned>

type Story = StoryObj<typeof RatingCardRedesigned>

export const Light: Story = {}
