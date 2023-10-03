import type { Meta, StoryObj } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import { CodeHighlightPlugin } from '@/features/CodeHighlightPlugin'
import { CodeBlockToolbarPlugin } from './CodeBlockToolbarPlugin'

export default {
  title: 'features/CodeBlockToolbarPlugin/CodeBlockToolbarPlugin',
  component: CodeBlockToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CodeBlockToolbarPlugin>

type Story = StoryObj<typeof CodeBlockToolbarPlugin>

const primary = {
  decorators: [
    LexicalDecorator({
      nodes: [CodeNode, CodeHighlightNode],
      withEditor: true,
    }),
  ],
}

export const PrimaryRedesigned: Story = primary
export const PrimaryDeprecated: Story = primary

const withCodeHighlightPlugin = {
  decorators: [
    LexicalDecorator({
      nodes: [CodeNode, CodeHighlightNode],
      plugins: <CodeHighlightPlugin />,
      withEditor: true,
    }),
  ],
}
export const WithCodeHighlightPluginRedesigned: Story =
  withCodeHighlightPlugin
export const WithCodeHighlightPluginDeprecated: Story =
  withCodeHighlightPlugin
