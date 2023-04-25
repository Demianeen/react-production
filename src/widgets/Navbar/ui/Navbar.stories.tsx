import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'shared/contexts/theme-context'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'
import { Navbar } from './Navbar'

export default {
  title: 'widget/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => (
  <Navbar {...args} />
)

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({}),
]

export const AuthNavbar = Template.bind({})
AuthNavbar.args = {}
AuthNavbar.decorators = [
  StoreDecorator({
    user: { authData: {} },
  }),
]
