import type { Meta, StoryObj } from '@storybook/react'
import { UserNavigation } from './UserNavigation'

export default {
  title: 'features/UserNavigation',
  component: UserNavigation,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof UserNavigation>

type Story = StoryObj<typeof UserNavigation>

export const Light: Story = {}
