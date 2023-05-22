import type { Meta, StoryObj } from '@storybook/react'
import { WithLabelSkeleton } from './WithLabelSkeleton'

export default {
  title: 'shared/WithLabel',
  component: WithLabelSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'some other skeleton',
  },
} as Meta<typeof WithLabelSkeleton>

type Story = StoryObj<typeof WithLabelSkeleton>

export const Skeleton: Story = {}
