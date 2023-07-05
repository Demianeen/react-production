import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { ArticleInfiniteListRedesigned } from './ArticleInfiniteListRedesigned'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList/redesigned',
  component: ArticleInfiniteListRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage')],
} as Meta<typeof ArticleInfiniteListRedesigned>

type Story = StoryObj<typeof ArticleInfiniteListRedesigned>

export const Light: Story = {}

export const Loading: Story = {}
