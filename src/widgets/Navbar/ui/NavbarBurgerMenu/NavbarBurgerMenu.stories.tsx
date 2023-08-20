import type { StoryObj, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { NavbarBurgerMenu } from './NavbarBurgerMenu'

export default {
  title: 'widgets/Navbar/NavbarBurgerMenu',
  component: NavbarBurgerMenu,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarBurgerMenu>

type Story = StoryObj<typeof NavbarBurgerMenu>

const primary = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
  },
}

export const PrimaryRedesigned: Story = primary
export const PrimaryDeprecated: Story = primary
