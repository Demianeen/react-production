import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { Navbar } from './Navbar'

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Navbar>

type Story = StoryObj<typeof Navbar>

export const Light: Story = {
  decorators: [StoreDecorator()],
}

export const Logged: Story = {
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: 1,
          username: 'username',
        },
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(),
  ],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED), StoreDecorator()],
}
