import type { Meta, StoryObj } from '@storybook/react'
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider'
import { NotificationDrawer } from './NotificationDrawer'

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
} as Meta<typeof NotificationDrawer>

type Story = StoryObj<typeof NotificationDrawer>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

export const LoadingDeprecated: Story = {}
export const LoadingRedesigned: Story = {}

export const EmptyDeprecated: Story = {}
export const EmptyRedesigned: Story = {}

export const ErrorDeprecated: Story = {}
export const ErrorRedesigned: Story = {}
