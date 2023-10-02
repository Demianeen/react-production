import type { Meta, StoryObj } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { TextFormatToolbarPlugin } from './TextFormatToolbarPlugin'

export default {
  title: 'features/TextFormatToolbarPlugin',
  component: TextFormatToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
  decorators: [
    LexicalDecorator({
      nodes: [],
      withEditor: true,
    }),
  ],
} as Meta<typeof TextFormatToolbarPlugin>

type Story = StoryObj<typeof TextFormatToolbarPlugin>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
