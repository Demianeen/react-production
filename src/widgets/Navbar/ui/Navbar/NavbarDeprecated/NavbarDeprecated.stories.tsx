import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { NavbarDeprecated } from './NavbarDeprecated'

export default {
  title: 'widgets/Navbar/deprecated',
  component: NavbarDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof NavbarDeprecated>

type Story = StoryObj<typeof NavbarDeprecated>

export const Logged: Story = {
  decorators: [],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
