import type { Meta, StoryObj } from '@storybook/react'
import { InputSkeleton } from './InputSkeleton'

export default {
  title: 'shared/deprecated/Input',
  component: InputSkeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof InputSkeleton>

type Story = StoryObj<typeof InputSkeleton>

export const LightSkeleton: Story = {}

export const MaxWidthSkeleton: Story = {
  args: {
    maxWidth: true,
  },
}
