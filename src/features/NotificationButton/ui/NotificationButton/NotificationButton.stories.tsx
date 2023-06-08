import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { NotificationButton } from './NotificationButton'

export default {
  title: 'features/NotificationButton/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof NotificationButton>

type Story = StoryObj<typeof NotificationButton>

export const Light: Story = {}

export const Loading: Story = {}

export const Empty: Story = {}

export const Error: Story = {}
