import type { Meta, StoryObj } from '@storybook/react'
import { TextFormatToolbarPlugin } from './TextFormatToolbarPlugin'

export default {
  title: 'features/TextFormatToolbarPlugin',
  component: TextFormatToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof TextFormatToolbarPlugin>

type Story = StoryObj<typeof TextFormatToolbarPlugin>

export const Light: Story = {}
