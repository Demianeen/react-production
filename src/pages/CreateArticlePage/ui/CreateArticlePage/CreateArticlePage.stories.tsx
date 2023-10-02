import type { Meta, StoryObj } from '@storybook/react'
import CreateArticlePage from './CreateArticlePage'

export default {
  title: 'pages/CreateArticlePage/CreateArticlePage',
  component: CreateArticlePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CreateArticlePage>

type Story = StoryObj<typeof CreateArticlePage>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}
