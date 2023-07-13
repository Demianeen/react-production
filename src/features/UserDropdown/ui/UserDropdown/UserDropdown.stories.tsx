import type { Meta, StoryObj } from '@storybook/react'
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
  decorators: [LayoutDecorator('centered')],
} as Meta<typeof UserDropdown>

type Story = StoryObj<typeof UserDropdown>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
