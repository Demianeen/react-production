import type { StoryObj, Meta } from '@storybook/react'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { SidebarRedesigned } from './SidebarRedesigned'

export default {
  title: 'widgets/Sidebar/Sidebar/redesigned',
  component: SidebarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage')],
} as Meta<typeof SidebarRedesigned>

type Story = StoryObj<typeof SidebarRedesigned>

export const Light: Story = {
  decorators: [],
}

export const Unauthorized: Story = {
  decorators: [InitUserDecorator(null)],
}
