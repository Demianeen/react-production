import type { StoryObj, Meta } from '@storybook/react'
import { SidebarItemRedesigned } from './SidebarItemRedesigned'

export default {
  title: 'AFiletemplate/SidebarItemRedesigned',
  component: SidebarItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof SidebarItemRedesigned>

type Story = StoryObj<typeof SidebarItemRedesigned>

export const Primary: Story = {
  args: {},
}
