import type { Meta, StoryObj } from '@storybook/react'
import { EditArticle } from './EditArticle'

export default {
  title: 'features/EditArticle',
  component: EditArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof EditArticle>

type Story = StoryObj<typeof EditArticle>

export const Light: Story = {}
