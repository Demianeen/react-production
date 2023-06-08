import type { Meta, StoryObj } from '@storybook/react'
import AdminPanelPage from './AdminPanelPage'

export default {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof AdminPanelPage>

type Story = StoryObj<typeof AdminPanelPage>
export const Light: Story = {}
