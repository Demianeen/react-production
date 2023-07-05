import type { Meta, StoryObj } from '@storybook/react'
import { InputSkeleton } from './InputSkeleton'

export default {
  title: 'shared/Input',
  component: InputSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof InputSkeleton>

type Story = StoryObj<typeof InputSkeleton>

export const Light: Story = {}
