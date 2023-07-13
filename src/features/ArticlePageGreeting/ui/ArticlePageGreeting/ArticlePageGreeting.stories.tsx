import type { Meta, StoryObj } from '@storybook/react'
import { ArticlePageGreeting } from './ArticlePageGreeting'

export default {
  title: 'features/ArticlePageGreeting',
  component: ArticlePageGreeting,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ArticlePageGreeting>

type Story = StoryObj<typeof ArticlePageGreeting>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
