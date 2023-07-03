import type { Meta, StoryObj } from '@storybook/react'
import { CardSkeleton } from './CardSkeleton'
import type { Card } from './Card'

export default {
  title: 'shared/Card',
  component: CardSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const LightSkeleton: Story = {}
