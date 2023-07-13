import type { StoryObj, Meta } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { NotificationButtonDeprecated } from './NotificationButtonDeprecated'

export default {
  title: 'features/NotificationButton/deprecated',
  component: NotificationButtonDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof NotificationButtonDeprecated>

type Story = StoryObj<typeof NotificationButtonDeprecated>

export const Primary: Story = {
  args: {},
}

export const Loading: Story = {}

export const Empty: Story = {}

export const Error: Story = {}
