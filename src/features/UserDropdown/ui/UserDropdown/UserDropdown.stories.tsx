import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { UserDropdown } from './UserDropdown'

export default {
  title: 'features/UserDropdown',
  component: UserDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [StoreDecorator()],
} as Meta<typeof UserDropdown>

type Story = StoryObj<typeof UserDropdown>

export const Light: Story = {}
