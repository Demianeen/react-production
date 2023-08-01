import type { Meta, StoryObj } from '@storybook/react'
import { CiDelayDecorator } from '@/shared/lib/storybook/CiDelayDecorator'
import { ArticleCommentList } from './ArticleCommentList'

export default {
  title: 'features/ArticleCommentList',
  component: ArticleCommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    articleId: 1,
  },
  decorators: [CiDelayDecorator],
} as Meta<typeof ArticleCommentList>

type Story = StoryObj<typeof ArticleCommentList>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

export const LoadingDeprecated: Story = {}
export const LoadingRedesigned: Story = {}
