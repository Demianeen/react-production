import type { Meta, StoryObj } from '@storybook/react'
import { RatingCard } from './RatingCard'

export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    title: 'Rate this article',
    feedbackTitle: 'Tell us what you think',
  },
  parameters: {},
} as Meta<typeof RatingCard>

type Story = StoryObj<typeof RatingCard>

export const Light: Story = {}

export const Squared: Story = {
  args: {
    squared: true,
  },
}
