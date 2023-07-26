import type { StoryObj, Meta } from '@storybook/react'
import { NavbarBurger } from './NavbarBurger'

export default {
  title: 'AFiletemplate/NavbarBurger',
  component: NavbarBurger,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarBurger>

type Story = StoryObj<typeof NavbarBurger>

export const Primary: Story = {
  args: {},
}
