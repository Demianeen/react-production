import type { StoryObj, Meta } from '@storybook/react'
import { MainLayout } from './MainLayout'

export default {
  title: 'layouts/MainLayout',
  component: MainLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    content: 'Content',
    header: 'Header',
    sidebar: 'Sidebar',
    toolbar: 'Toolbar',
  },
} as Meta<typeof MainLayout>

type Story = StoryObj<typeof MainLayout>

export const All: Story = {
  args: {},
}

export const WithoutToolbar: Story = {
  args: {
    toolbar: undefined,
  },
}
