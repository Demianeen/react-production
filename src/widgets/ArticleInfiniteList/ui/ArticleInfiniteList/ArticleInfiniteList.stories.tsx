import type { Meta, StoryObj } from '@storybook/react'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { ArticleInfiniteList } from './ArticleInfiniteList'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LayoutDecorator('fullpage')],
} as Meta<typeof ArticleInfiniteList>

type Story = StoryObj<typeof ArticleInfiniteList>

export const Light: Story = {}

export const Loading: Story = {}
