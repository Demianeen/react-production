import type { StoryObj, Meta } from '@storybook/react'
import HomeIconDeprecated from '@/shared/assets/icons/deprecated/home-20-20.svg'
import { routes } from '@/shared/lib/router/routes'
import { UserNavigationItemDeprecated } from './UserNavigationItemDeprecated'

export default {
  title: 'features/UserNavigation/UserNavigationItem/deprecated',
  component: UserNavigationItemDeprecated,
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
} as Meta<typeof UserNavigationItemDeprecated>

type Story = StoryObj<typeof UserNavigationItemDeprecated>

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
