import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
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
  decorators: [StoreDecorator()],
} as Meta<typeof RatingCard>

type Story = StoryObj<typeof RatingCard>

export const Light: Story = {}

export const Squared: Story = {
  args: {
    squared: true,
  },
}
