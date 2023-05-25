import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { Sidebar } from './Sidebar'

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Sidebar>

type Story = StoryObj<typeof Sidebar>

export const Light: Story = {
  decorators: [
    StoreDecorator({
      user: {
        authData: {},
      },
    }),
  ],
}

export const NoAuth: Story = {
  decorators: [StoreDecorator()],
}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      user: {
        authData: {},
      },
    }),
  ],
}

export const Red: Story = {
  decorators: [
    ThemeDecorator(Theme.RED),
    StoreDecorator({
      user: {
        authData: {},
      },
    }),
  ],
}
