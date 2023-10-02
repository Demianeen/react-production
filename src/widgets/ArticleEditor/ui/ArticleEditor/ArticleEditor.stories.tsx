import type { Meta, StoryObj } from '@storybook/react'
import { ArticleEditor } from './ArticleEditor'

export default {
  title: 'widgets/ArticleEditor/ArticleEditor',
  component: ArticleEditor,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof ArticleEditor>

type Story = StoryObj<typeof ArticleEditor>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
