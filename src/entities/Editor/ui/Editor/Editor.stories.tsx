import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'

export default {
  title: 'entities/Editor/Editor',
  component: Editor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    placeholder: 'Type something...',
  },
  parameters: {},
} as Meta<typeof Editor>

type Story = StoryObj<typeof Editor>

export const LightRedesigned: Story = {}
export const LightDeprecated: Story = {}

export const WithMinHightRedesigned: Story = {
  args: {
    minHeight: '25rem',
  },
}
