import type { Meta, StoryObj } from '@storybook/react'
import SettingsPage from './SettingsPage'

export default {
  title: 'pages/SettingsPage',
  component: SettingsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof SettingsPage>

type Story = StoryObj<typeof SettingsPage>

export const Light: Story = {}
