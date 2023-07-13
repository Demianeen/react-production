import type { StoryObj, Meta } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { NotificationButtonRedesigned } from './NotificationButtonRedesigned'

export default {
  title: 'features/NotificationButton/redesigned',
  component: NotificationButtonRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof NotificationButtonRedesigned>

type Story = StoryObj<typeof NotificationButtonRedesigned>

export const Primary: Story = {
  args: {},
}

export const Loading: Story = {}

export const Empty: Story = {}

export const Error: Story = {}
