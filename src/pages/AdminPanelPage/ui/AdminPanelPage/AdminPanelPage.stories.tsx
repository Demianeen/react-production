import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import AdminPanelPage from './AdminPanelPage'

export default {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof AdminPanelPage>

type Story = StoryObj<typeof AdminPanelPage>
export const Light: Story = {}
