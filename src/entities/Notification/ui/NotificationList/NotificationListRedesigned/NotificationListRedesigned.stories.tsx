import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { NotificationListRedesigned } from './NotificationListRedesigned'

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationListRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {
    loki: {
      skip: true,
    },
  },
} as Meta<typeof NotificationListRedesigned>

type Story = StoryObj<typeof NotificationListRedesigned>

export const Light: Story = {}

export const Loading: Story = {}

export const Error: Story = {}

export const Empty: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
