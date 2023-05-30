import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import AboutIcon from '@/shared/assets/icons/about-us-20-20.svg'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { RoutePath } from '@/shared/const/routePath'
import { SidebarItem } from './SidebarItem'

export default {
  title: 'widgets/SidebarItem',
  component: SidebarItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    item: {
      path: RoutePath.about,
      text: 'About us',
      Icon: AboutIcon,
    },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof SidebarItem>

type Story = StoryObj<typeof SidebarItem>
export const Light: Story = {
  args: {
    isCollapsed: false,
  },
}

export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
}

export const Dark: Story = {
  args: {
    isCollapsed: false,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  args: {
    isCollapsed: false,
  },
  decorators: [ThemeDecorator(Theme.RED)],
}
