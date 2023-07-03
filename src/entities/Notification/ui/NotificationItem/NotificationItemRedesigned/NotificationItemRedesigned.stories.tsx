import type { Meta, StoryObj } from '@storybook/react'
import { mockNotification } from '../../../model/mocks/mockNotification'
import { NotificationItemRedesigned } from './NotificationItemRedesigned'

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof NotificationItemRedesigned>

type Story = StoryObj<typeof NotificationItemRedesigned>

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
