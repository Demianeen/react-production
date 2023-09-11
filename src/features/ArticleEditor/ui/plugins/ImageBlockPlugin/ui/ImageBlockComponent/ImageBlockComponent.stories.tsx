import type { Meta, StoryObj } from '@storybook/react'
import { createEditor } from 'lexical'
import { ImageBlockComponent } from './ImageBlockComponent'

export default {
  title: 'feature/ArticleEditor/ImageBlockComponent',
  component: ImageBlockComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
    altText: 'altText',
    caption: createEditor(),
    key: 'key',
    showCaption: true,
    captionsEnabled: true,
  },
} as Meta<typeof ImageBlockComponent>

type Story = StoryObj<typeof ImageBlockComponent>

export const WithoutTitleDeprecated: Story = {}
export const WithoutTitleRedesigned: Story = {}
