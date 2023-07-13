import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Card } from './Card'

export default {
  title: 'shared/redesigned/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Primary: Story = {}

export const BackgroundLight: Story = {
  args: {
    background: 'light',
  },
}

export const MaxWidth: Story = {
  args: {
    maxWidth: true,
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
