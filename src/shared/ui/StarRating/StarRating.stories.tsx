import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StarRating } from './StarRating'

export default {
  title: 'shared/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSelect: action('onSelect'),
  },
  parameters: {},
  decorators: [StoreDecorator()],
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

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
