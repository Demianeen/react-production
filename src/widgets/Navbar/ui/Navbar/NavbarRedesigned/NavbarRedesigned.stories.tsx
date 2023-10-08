import type { StoryObj, Meta } from '@storybook/react'
import { NavbarRedesigned } from './NavbarRedesigned'

export default {
  title: 'widgets/Navbar/Redesigned',
  component: NavbarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarRedesigned>

type Story = StoryObj<typeof NavbarRedesigned>

export const Logged: Story = {
  args: {},
}
