import type { StoryObj, Meta } from '@storybook/react'
import { ToolbarPlugin } from './ToolbarPlugin'

export default {
  title: 'AFiletemplate/ToolbarPlugin',
  component: ToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ToolbarPlugin>

type Story = StoryObj<typeof ToolbarPlugin>

export const Primary: Story = {
  args: {},
}
