import type { Meta, StoryObj } from '@storybook/react'
import { LinkNode } from '@lexical/link'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { LinkToolbarPlugin } from './LinkToolbarPlugin'

export default {
  title: 'features/LinkToolbarPlugin/LinkToolbarPlugin',
  component: LinkToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [
    LexicalDecorator({
      nodes: [LinkNode],
      withEditor: true,
    }),
  ],
} as Meta<typeof LinkToolbarPlugin>

type Story = StoryObj<typeof LinkToolbarPlugin>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
