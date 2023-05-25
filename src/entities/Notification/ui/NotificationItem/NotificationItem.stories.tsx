import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { mockNotification } from '@/entities/Notification/mocks/notificationMockData'
import { NotificationItem } from './NotificationItem'

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof NotificationItem>

type Story = StoryObj<typeof NotificationItem>

export const Light: Story = {
  args: {
    item: mockNotification,
  },
}

export const Href: Story = {
  args: {
    item: {
      ...mockNotification,
      href: 'https://google.com',
    },
  },
}
