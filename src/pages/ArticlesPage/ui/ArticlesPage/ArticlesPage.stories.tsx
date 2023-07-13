import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { withJsonSettings } from '@/entities/User/testing'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import ArticlesPage from './ArticlesPage'

export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  parameters: {
    loki: {
      // storybook throws an error when rendering this component because of virtuoso
      skip: true,
    },
  },
  decorators: [
    StoreDecorator(
      withJsonSettings({
        isArticlesPageWasOpened: true,
      })
    ),
    LayoutDecorator('fullpage'),
  ],
} as Meta<typeof ArticlesPage>

type Story = StoryObj<typeof ArticlesPage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

const firstOpen = {
  decorators: [
    StoreDecorator(
      withJsonSettings({
        isArticlesPageWasOpened: false,
      })
    ),
  ],
}
export const FirstOpenDeprecated: Story = firstOpen
export const FirstOpenRedesigned: Story = firstOpen
