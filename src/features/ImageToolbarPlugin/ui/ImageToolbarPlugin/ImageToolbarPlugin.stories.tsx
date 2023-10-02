import type { StoryObj, Meta } from '@storybook/react'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { ImageNode } from '../../lib/ImageNode/ImageNode'
import { ImageToolbarPlugin } from './ImageToolbarPlugin'

export default {
  title: 'features/ImageToolbarPlugin/ImageToolbarPlugin',
  component: ImageToolbarPlugin,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    LexicalDecorator({
      nodes: [ImageNode],
      withEditor: true,
    }),
  ],
} as Meta<typeof ImageToolbarPlugin>

type Story = StoryObj<typeof ImageToolbarPlugin>

export const PrimaryRedesigned: Story = {}
export const PrimaryDeprecated: Story = {}
