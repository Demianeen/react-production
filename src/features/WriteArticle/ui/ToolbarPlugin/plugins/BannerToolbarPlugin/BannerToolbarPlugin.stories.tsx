import type { StoryObj, Meta } from '@storybook/react'
import { BannerToolbarPlugin } from './BannerToolbarPlugin'

export default {
  title: 'AFiletemplate/BannerToolbarPlugin',
  component: BannerToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof BannerToolbarPlugin>

type Story = StoryObj<typeof BannerToolbarPlugin>

export const Primary: Story = {
  args: {},
}
