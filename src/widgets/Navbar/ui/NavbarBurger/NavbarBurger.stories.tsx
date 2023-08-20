import type { StoryObj, Meta } from '@storybook/react'
import { NavbarBurger } from './NavbarBurger'

export default {
  title: 'widgets/Navbar/NavbarBurger',
  component: NavbarBurger,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarBurger>

type Story = StoryObj<typeof NavbarBurger>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
