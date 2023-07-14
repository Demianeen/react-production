import type { Meta, StoryObj } from '@storybook/react'
import { RoutePath } from '@/shared/const/router/routePath'
import { routes } from '@/shared/lib/router/routes'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import createAsyncCallback from '@loki/create-async-callback'
import ProfilePage from './ProfilePage'

export const AsyncStory = () => (
  // @ts-expect-error test
  <ProfilePage onDone={createAsyncCallback()} />
)

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
  },
} as Meta<typeof ProfilePage>

type Story = StoryObj<typeof ProfilePage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

const notFound = {
  parameters: {
    reactRouter: {
      routePath: routes.profile({ id: '' }),
    },
  },
  decorators: [LayoutDecorator('fullpage')],
}

export const NotFoundDeprecated: Story = notFound
export const NotFoundRedesigned: Story = notFound
