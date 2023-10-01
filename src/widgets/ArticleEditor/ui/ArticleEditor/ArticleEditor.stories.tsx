import type { Meta, StoryObj } from '@storybook/react'
import { ArticleEditor } from './ArticleEditor'

export default {
  title: 'features/ArticleEditor',
  component: ArticleEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ArticleEditor>

type Story = StoryObj<typeof ArticleEditor>

export const Light: Story = {}
