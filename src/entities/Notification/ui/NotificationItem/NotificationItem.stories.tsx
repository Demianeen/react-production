import type { Meta, StoryObj } from '@storybook/react'
import { mockNotification } from '../../model/mocks/mockNotification'
import { NotificationItem } from './NotificationItem'

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
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
