import type { Meta, StoryObj } from '@storybook/react'
import { mockNotification } from '../../../model/mocks/mockNotification'
import { NotificationItemDeprecated } from './NotificationItemDeprecated'

export default {
  title: 'entities/Notification/NotificationItem',
  component: NotificationItemDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof NotificationItemDeprecated>

type Story = StoryObj<typeof NotificationItemDeprecated>

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
