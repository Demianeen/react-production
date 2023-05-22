import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import ProfilePage from './ProfilePage'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    reactRouter: {
      routePath: `${RoutePath.profile}:id`,
      routeParams: { id: '1' },
    },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ProfilePage>

type Story = StoryObj<typeof ProfilePage>

export const Light: Story = {}

export const NotFound: Story = {
  parameters: {
    reactRouter: {
      routePath: `${RoutePath.profile}`,
    },
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
