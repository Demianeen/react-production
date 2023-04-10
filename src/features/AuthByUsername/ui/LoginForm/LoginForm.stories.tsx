import React from 'react'
import type {
  ComponentMeta,
  ComponentStory,
} from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import LoginForm from './LoginForm'

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (
  args
) => <LoginForm {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator()]

export const WithValue = Template.bind({})
WithValue.args = {}
WithValue.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'username',
      password: 'password',
    },
  }),
]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
  StoreDecorator({
    loginForm: {
      error: 'Error',
    },
  }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
  StoreDecorator({
    loginForm: {
      isLoading: true,
    },
  }),
]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator(),
]
