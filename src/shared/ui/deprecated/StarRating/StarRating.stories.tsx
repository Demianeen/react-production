import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StarRating } from './StarRating'

export default {
  title: 'shared/deprecated/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSelect: action('onSelect'),
  },
  parameters: {},
} as Meta<typeof StarRating>

type Story = StoryObj<typeof StarRating>

export const NotSelected: Story = {}

export const Selected: Story = {
  args: {
    selectedStars: 3,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
