import type { StoryObj, Meta } from '@storybook/react'
import HomeIcon from '@/shared/assets/icons/redesigned/home.svg'
import { routes } from '@/shared/lib/router/routes'
import { UserNavigationItemRedesigned } from './UserNavigationItemRedesigned'

export default {
  title: 'features/UserNavigation/UserNavigationItem/redesigned',
  component: UserNavigationItemRedesigned,
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
} as Meta<typeof UserNavigationItemRedesigned>

type Story = StoryObj<typeof UserNavigationItemRedesigned>

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
