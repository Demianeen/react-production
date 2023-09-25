import type { StoryObj, Meta } from '@storybook/react'
import { ImageToolbarPlugin } from './ImageToolbarPlugin'

export default {
  title: 'AFiletemplate/ImageToolbarPlugin',
  component: ImageToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ImageToolbarPlugin>

type Story = StoryObj<typeof ImageToolbarPlugin>

export const Primary: Story = {
  args: {},
}
