import type { StoryObj, Meta } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { CodeNode } from '@lexical/code'
import { ListItemNode, ListNode } from '@lexical/list'
import { HeadingNode } from '@lexical/rich-text'
import { SelectBlockTypeToolbarPlugin } from './SelectBlockTypeToolbarPlugin'

export default {
  title: 'widgets/ArticleEditor/SelectBlockTypeToolbarPlugin',
  component: SelectBlockTypeToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    LexicalDecorator({
      nodes: [CodeNode, ListNode, ListItemNode, HeadingNode],
      withEditor: true,
    }),
  ],
} as Meta<typeof SelectBlockTypeToolbarPlugin>

type Story = StoryObj<typeof SelectBlockTypeToolbarPlugin>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
