import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import HomePage from './HomePage'

export default {
  title: 'pages/HomePage',
  component: HomePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof HomePage>

type Story = StoryObj<typeof HomePage>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
