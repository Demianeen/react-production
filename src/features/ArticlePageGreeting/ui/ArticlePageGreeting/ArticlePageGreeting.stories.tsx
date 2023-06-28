import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticlePageGreeting } from './ArticlePageGreeting'

export default {
  title: '$PARENT_DIR/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ArticlePageGreeting>

type Story = StoryObj<typeof ArticlePageGreeting>

export const Light: Story = {}
