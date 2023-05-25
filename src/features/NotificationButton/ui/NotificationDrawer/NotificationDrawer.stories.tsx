import type { Meta, StoryObj } from '@storybook/react'
import { NotificationDrawer } from '@/features/NotificationButton/ui/NotificationDrawer/NotificationDrawer'
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'

export default {
  title: 'features/NotificationButton/NotificationDrawer',
  component: NotificationDrawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  render: (args) => (
    <AnimationProvider>
      <NotificationDrawer {...args} />
    </AnimationProvider>
  ),
  decorators: [StoreDecorator()],
} as Meta<typeof NotificationDrawer>

type Story = StoryObj<typeof NotificationDrawer>

export const Light: Story = {}

export const Loading: Story = {}

export const Empty: Story = {}

export const Error: Story = {}
