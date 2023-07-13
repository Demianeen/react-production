import type { StoryObj, Meta } from '@storybook/react'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { SidebarDeprecated } from './SidebarDeprecated'

export default {
  title: 'widgets/Sidebar/Sidebar/deprecated',
  component: SidebarDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarDeprecated>

type Story = StoryObj<typeof SidebarDeprecated>

export const Light: Story = {
  decorators: [],
}

export const Unauthorized: Story = {
  decorators: [InitUserDecorator(null)],
}
