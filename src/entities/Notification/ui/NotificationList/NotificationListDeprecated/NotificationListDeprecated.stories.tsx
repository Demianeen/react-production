import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { NotificationListDeprecated } from './NotificationListDeprecated'

export default {
  title: 'entities/Notification/NotificationList/deprecated',
  component: NotificationListDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [LokiDelayDecorator()],
} as Meta<typeof NotificationListDeprecated>

type Story = StoryObj<typeof NotificationListDeprecated>

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
