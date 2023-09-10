import type { StoryObj, Meta } from '@storybook/react'
import { ImageBlockPluginOld2 } from './ImageBlockPlugin'

export default {
  title: 'AFiletemplate/ImageBlockPlugin',
  component: ImageBlockPluginOld2,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ImageBlockPluginOld2>

type Story = StoryObj<typeof ImageBlockPluginOld2>

export const Primary: Story = {
  args: {},
}
