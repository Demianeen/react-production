import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { WithLabel } from './WithLabel'

export default {
  title: 'shared/WithLabel',
  component: WithLabel,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <input />,
    label: 'Label',
  },
} as Meta<typeof WithLabel>

type Story = StoryObj<typeof WithLabel>

export const Light: Story = {}

export const WithMaxWidth: Story = {
  args: {
    maxWidth: true,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
