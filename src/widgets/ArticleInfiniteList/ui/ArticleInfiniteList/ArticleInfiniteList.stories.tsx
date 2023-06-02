import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { LayoutDecorator } from '@/shared/lib/storybook/LayoutDecorator'
import { ArticleInfiniteList } from './ArticleInfiniteList'

export default {
  title: 'widgets/ArticleInfiniteList/ArticleInfiniteList',
  component: ArticleInfiniteList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    StoreDecorator(),
    LayoutDecorator('fullpage'),
  ],
} as Meta<typeof ArticleInfiniteList>

type Story = StoryObj<typeof ArticleInfiniteList>

export const Light: Story = {}

export const Loading: Story = {}
