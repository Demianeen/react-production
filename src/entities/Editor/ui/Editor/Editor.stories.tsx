import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'

export default {
  title: 'entities/Editor',
  component: Editor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof Editor>

type Story = StoryObj<typeof Editor>

export const Light: Story = {}
