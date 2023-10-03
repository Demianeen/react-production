import type { StoryObj, Meta } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { ToolbarNodes, ToolbarPlugin } from './ToolbarPlugin'

export default {
  title: 'widgets/ArticleEditor/ToolbarPlugin',
  component: ToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    LexicalDecorator({ nodes: ToolbarNodes, withEditor: true }),
  ],
} as Meta<typeof ToolbarPlugin>

type Story = StoryObj<typeof ToolbarPlugin>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
