import type { Meta, StoryObj } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { ImageNode } from '../../lib/ImageNode/ImageNode'
import { ImagePrompt } from './ImagePrompt'

export default {
  title: 'features/ImageToolbarPlugin/ImagePrompt',
  component: ImagePrompt,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    isOpen: true,
  },
  parameters: {},
  decorators: [LexicalDecorator([ImageNode])],
} as Meta<typeof ImagePrompt>

type Story = StoryObj<typeof ImagePrompt>

export const LightRedesigned: Story = {}
export const LightDeprecated: Story = {}
