import type { Meta, StoryObj } from '@storybook/react'
import { ButtonSkeleton } from './ButtonSkeleton'

export default {
  title: 'shared/redesigned/Button',
  component: ButtonSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ButtonSkeleton>

type Story = StoryObj<typeof ButtonSkeleton>

export const Skeleton: Story = {}
