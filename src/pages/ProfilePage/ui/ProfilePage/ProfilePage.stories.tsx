import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { RoutePath } from '@/shared/const/router/routePath'
import { routes } from '@/shared/lib/router/routes'
import ProfilePage from './ProfilePage'

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    reactRouter: {
      routePath: RoutePath.profile,
      routeParams: { id: '1' },
    },
    loki: {
      skip: true,
    },
  },
} as Meta<typeof ProfilePage>

type Story = StoryObj<typeof ProfilePage>

export const Light: Story = {}

export const NotFound: Story = {
  parameters: {
    reactRouter: {
      routePath: routes.profile({ id: '' }),
    },
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
