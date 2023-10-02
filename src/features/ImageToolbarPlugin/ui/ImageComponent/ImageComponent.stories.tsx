import type { Meta, StoryObj } from '@storybook/react'
import { createEditor } from 'lexical'
import { LexicalDecorator } from '@/shared/lib/storybook/LexicalDecorator'
import { ImageNode } from '../../lib/ImageNode/ImageNode'
import { ImageComponent } from './ImageComponent'

export default {
  title: 'features/ImageToolbarPlugin/ImageComponent',
  component: ImageComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
    altText: 'altText',
    caption: createEditor(),
  },
  decorators: [
    LexicalDecorator({
      nodes: [ImageNode],
    }),
  ],
} as Meta<typeof ImageComponent>

type Story = StoryObj<typeof ImageComponent>

export const WithoutTitleDeprecated: Story = {}
export const WithoutTitleRedesigned: Story = {}
