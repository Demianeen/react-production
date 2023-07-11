import type { Meta, StoryObj } from '@storybook/react'
import { ScrollToolbar } from './ScrollToolbar'

export default {
  title: 'widgets/ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ScrollToolbar>

type Story = StoryObj<typeof ScrollToolbar>

export const Light: Story = {}
