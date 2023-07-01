import type { StoryObj, Meta } from '@storybook/react'
import { NavbarRedesigned } from './NavbarRedesigned'

export default {
  title: 'AFiletemplate/NavbarRedesigned',
  component: NavbarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarRedesigned>

type Story = StoryObj<typeof NavbarRedesigned>

export const Primary: Story = {
  args: {},
}
