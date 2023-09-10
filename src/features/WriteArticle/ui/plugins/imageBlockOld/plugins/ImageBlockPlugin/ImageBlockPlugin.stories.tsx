import type { StoryObj, Meta } from '@storybook/react'
import { ImageBlockPlugin } from './ImageBlockPlugin'

export default {
  title: 'AFiletemplate/ImageBlockPlugin',
  component: ImageBlockPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ImageBlockPlugin>

type Story = StoryObj<typeof ImageBlockPlugin>

export const Primary: Story = {
  args: {},
}
