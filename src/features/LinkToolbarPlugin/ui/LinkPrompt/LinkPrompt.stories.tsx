import type { Meta, StoryObj } from '@storybook/react'
import { LinkNode } from '@lexical/link'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { LinkPrompt } from './LinkPrompt'

export default {
  title: 'features/LinkToolbarPlugin/LinkPrompt',
  component: LinkPrompt,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
  },
  parameters: {},
  decorators: [
    LexicalDecorator({
      nodes: [LinkNode],
    }),
  ],
} as Meta<typeof LinkPrompt>

type Story = StoryObj<typeof LinkPrompt>

export const LightRedesigned: Story = {}
export const LightDeprecated: Story = {}
