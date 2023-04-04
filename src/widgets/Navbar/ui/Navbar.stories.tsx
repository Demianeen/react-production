import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { Navbar } from 'widgets/Navbar'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator'

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
Light.decorators = [StoreDecorator()]

export const Logged = Template.bind({})
Logged.args = {}
Logged.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: 1,
        username: 'username',
      },
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator(),
]
