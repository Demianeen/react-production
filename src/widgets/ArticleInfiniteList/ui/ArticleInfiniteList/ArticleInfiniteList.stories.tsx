import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticleInfiniteList } from './ArticleInfiniteList'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ArticleInfiniteList>

type Story = StoryObj<typeof ArticleInfiniteList>

export const Light: Story = {}

export const Loading: Story = {}
