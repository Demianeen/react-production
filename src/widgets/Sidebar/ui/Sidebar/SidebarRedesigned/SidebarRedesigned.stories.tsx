import type { StoryObj, Meta } from '@storybook/react'
import { SidebarRedesigned } from './SidebarRedesigned'

export default {
  title: 'widgets/SidebarRedesigned',
  component: SidebarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarRedesigned>

type Story = StoryObj<typeof SidebarRedesigned>

export const Primary: Story = {
  args: {},
}
