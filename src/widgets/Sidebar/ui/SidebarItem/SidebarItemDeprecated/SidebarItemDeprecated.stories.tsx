import type { StoryObj, Meta } from '@storybook/react'
import HomeIconDeprecated from '@/shared/assets/icons/deprecated/home-20-20.svg'
import { routes } from '@/shared/lib/router/routes'
import { SidebarItemDeprecated } from './SidebarItemDeprecated'

export default {
  title: 'widgets/Sidebar/SidebarItem/deprecated',
  component: SidebarItemDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    item: {
      Icon: HomeIconDeprecated,
      path: routes.home(),
      text: 'Home',
    },
  },
} as Meta<typeof SidebarItemDeprecated>

type Story = StoryObj<typeof SidebarItemDeprecated>

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
