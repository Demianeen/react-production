import type { StoryObj, Meta } from '@storybook/react'
import { NavbarBurgerMenu } from './NavbarBurgerMenu'

export default {
  title: 'AFiletemplate/NavbarBurgerMenu',
  component: NavbarBurgerMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarBurgerMenu>

type Story = StoryObj<typeof NavbarBurgerMenu>

export const Primary: Story = {
  args: {},
}
