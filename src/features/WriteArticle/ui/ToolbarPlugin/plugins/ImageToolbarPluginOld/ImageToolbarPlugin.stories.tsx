import type { StoryObj, Meta } from '@storybook/react'
import { ImageToolbarPluginOld } from './ImageToolbarPlugin'

export default {
  title: 'AFiletemplate/ImageToolbarPlugin',
  component: ImageToolbarPluginOld,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ImageToolbarPluginOld>

type Story = StoryObj<typeof ImageToolbarPluginOld>

export const Primary: Story = {
  args: {},
}
