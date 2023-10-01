import type { Meta, StoryObj } from '@storybook/react'
import { DraggableBlockPlugin } from './DraggableBlockPlugin'

export default {
  title: 'features/DraggableBlockPlugin/DraggableBlockPlugin',
  component: DraggableBlockPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof DraggableBlockPlugin>

type Story = StoryObj<typeof DraggableBlockPlugin>

export const Light: Story = {}
