import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleBlockType } from '../../model/const/articleBlockType'
import type { ArticleImageBlock } from '../../model/types/article'
import { ArticleImageBlockComponent } from './ArticleImageBlockComponent'

const block: ArticleImageBlock = {
  type: ArticleBlockType.IMAGE,
  id: 1,
  src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
}

export default {
  title: 'entities/Article/ArticleImageBlockComponent',
  component: ArticleImageBlockComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: { block },
} as Meta<typeof ArticleImageBlockComponent>

type Story = StoryObj<typeof ArticleImageBlockComponent>
export const WithoutTitle: Story = {}

export const WithTitle: Story = {
  args: {
    block: {
      ...block,
      title: 'Title',
    },
  },
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
