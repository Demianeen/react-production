import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { NotificationButton } from './NotificationButton'

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof NotificationButton>

type Story = StoryObj<typeof NotificationButton>

export const Light: Story = {}
