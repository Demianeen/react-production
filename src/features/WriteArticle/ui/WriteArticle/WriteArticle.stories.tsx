import type { Meta, StoryObj } from '@storybook/react'
import { WriteArticle } from './WriteArticle'

export default {
  title: 'features/WriteArticle',
  component: WriteArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof WriteArticle>

type Story = StoryObj<typeof WriteArticle>

export const Light: Story = {}
