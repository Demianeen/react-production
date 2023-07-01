import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
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
} as Meta<typeof LoginForm>

type Story = StoryObj<typeof LoginForm>
export const Light: Story = {}

export const WithValue: Story = {
  decorators: [
    StoreDecorator({
      loginForm: {
        username: 'username',
        password: 'password',
      },
    }),
  ],
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      loginForm: {
        error: 'Error',
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      loginForm: {
        isLoading: true,
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
