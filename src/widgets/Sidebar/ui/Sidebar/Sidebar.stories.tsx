import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
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
  decorators: [],
}

export const NoAuth: Story = {
  decorators: [InitUserDecorator(null)],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
