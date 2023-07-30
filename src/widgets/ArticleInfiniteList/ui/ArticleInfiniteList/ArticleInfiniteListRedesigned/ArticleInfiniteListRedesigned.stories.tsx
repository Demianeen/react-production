import type { Meta, StoryObj } from '@storybook/react'
// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import { ParentDecorator } from '@/shared/lib/storybook/ParentDecorator'
import { ArticleInfiniteListRedesigned } from './ArticleInfiniteListRedesigned'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList/redesigned',
  component: ArticleInfiniteListRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    ParentDecorator({
      parentWidth: '100%',
    }),
  ],
} as Meta<typeof ArticleInfiniteListRedesigned>

type Story = StoryObj<typeof ArticleInfiniteListRedesigned>

export const Primary: Story = {}

export const Loading: Story = {}

export const ArticlesNotFound: Story = {}
