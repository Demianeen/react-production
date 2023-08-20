import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { withJsonSettings } from '@/entities/User/testing'
import { ArticlePageGreeting } from './ArticlePageGreeting'

export default {
  title: 'features/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [
    StoreDecorator(
      withJsonSettings({
        isArticlesPageWasOpened: false,
      })
    ),
  ],
} as Meta<typeof ArticlePageGreeting>

type Story = StoryObj<typeof ArticlePageGreeting>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
