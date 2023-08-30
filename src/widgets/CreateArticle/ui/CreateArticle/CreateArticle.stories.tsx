import type { Meta, StoryObj } from '@storybook/react'
import { CreateArticle } from './CreateArticle'

export default {
  title: 'widgets/CreateArticle',
  component: CreateArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof CreateArticle>

type Story = StoryObj<typeof CreateArticle>

export const Light: Story = {}
