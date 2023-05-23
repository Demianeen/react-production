import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { NotificationPopup } from './NotificationPopup'

export default {
  title: 'features/NotificationPopup',
  component: NotificationPopup,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof NotificationPopup>

type Story = StoryObj<typeof NotificationPopup>

export const Light: Story = {}
