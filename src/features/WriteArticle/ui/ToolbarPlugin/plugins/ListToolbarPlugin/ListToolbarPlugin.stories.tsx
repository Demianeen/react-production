import type { StoryObj, Meta } from '@storybook/react'
import { ListToolbarPlugin } from './ListToolbarPlugin'

export default {
  title: 'AFiletemplate/ListToolbarPlugin',
  component: ListToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ListToolbarPlugin>

type Story = StoryObj<typeof ListToolbarPlugin>

export const Primary: Story = {
  args: {},
}
