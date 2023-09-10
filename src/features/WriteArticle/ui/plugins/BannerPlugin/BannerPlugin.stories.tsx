import type { StoryObj, Meta } from '@storybook/react'
import { BannerPlugin } from './BannerPlugin'

export default {
  title: 'AFiletemplate/BannerPlugin',
  component: BannerPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof BannerPlugin>

type Story = StoryObj<typeof BannerPlugin>

export const Primary: Story = {
  args: {},
}
