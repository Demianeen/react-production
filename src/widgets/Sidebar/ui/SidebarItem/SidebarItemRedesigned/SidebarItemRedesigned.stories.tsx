import type { StoryObj, Meta } from '@storybook/react'
import HomeIcon from '@/shared/assets/icons/redesigned/home.svg'
import { routes } from '@/shared/lib/router/routes'
import { SidebarItemRedesigned } from './SidebarItemRedesigned'

export default {
  title: 'widgets/Sidebar/SidebarItem/redesigned',
  component: SidebarItemRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    item: {
      Icon: HomeIcon,
      path: routes.home(),
      text: 'Home',
    },
  },
} as Meta<typeof SidebarItemRedesigned>

type Story = StoryObj<typeof SidebarItemRedesigned>

export const Primary: Story = {
  args: {
    isCollapsed: false,
  },
}

export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
}
