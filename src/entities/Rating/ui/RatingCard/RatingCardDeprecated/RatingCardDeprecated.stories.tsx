import type { Meta, StoryObj } from '@storybook/react'
import { RatingCardDeprecated } from './RatingCardDeprecated'

export default {
  title: 'entities/Rating/RatingCard/deprecated',
  component: RatingCardDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    title: 'Rate this article',
    feedbackTitle: 'Tell us what you think',
  },
  parameters: {},
} as Meta<typeof RatingCardDeprecated>

type Story = StoryObj<typeof RatingCardDeprecated>

export const Light: Story = {}

export const Squared: Story = {
  args: {
    squared: true,
  },
}
