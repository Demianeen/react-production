import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import AboutIcon from 'shared/assets/icons/about-us-20-20.svg'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
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
} as ComponentMeta<typeof SidebarItem>

const Template: ComponentStory<typeof SidebarItem> = (
  args
) => <SidebarItem {...args} />

export const Light = Template.bind({})
Light.args = {
  isCollapsed: false,
}

export const Collapsed = Template.bind({})
Collapsed.args = {
  isCollapsed: true,
}

export const Dark = Template.bind({})
Dark.args = {
  isCollapsed: false,
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]

export const Red = Template.bind({})
Red.args = {
  isCollapsed: false,
}
Red.decorators = [ThemeDecorator(Theme.RED)]
