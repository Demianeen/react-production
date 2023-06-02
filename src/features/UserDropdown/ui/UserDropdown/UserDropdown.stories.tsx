import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { UserDropdown } from './UserDropdown'

export default {
  title: 'features/UserDropdown',
  component: UserDropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [
    InitUserDecorator(),
    StoreDecorator(),
    LayoutDecorator('centered'),
  ],
} as Meta<typeof UserDropdown>

type Story = StoryObj<typeof UserDropdown>

export const Light: Story = {}
