import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { Text } from '../Text/Text'
import { Card } from './Card'

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: <Text title='Title' text='Text' />,
  },
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Light: Story = {}

export const Squared: Story = {
  args: {
    squared: true,
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