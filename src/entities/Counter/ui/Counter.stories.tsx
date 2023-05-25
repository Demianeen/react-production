import type { Meta, StoryObj } from '@storybook/react'

import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { Counter } from './Counter'

export default {
  title: 'entities/Counter',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof Counter>

type Story = StoryObj<typeof Counter>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
