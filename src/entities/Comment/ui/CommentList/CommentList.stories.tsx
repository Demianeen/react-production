import type { Meta, StoryObj } from '@storybook/react'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { mockComments } from '../../model/mocks/mockCommentEntities'
import { CommentList } from './CommentList'

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof CommentList>

type Story = StoryObj<typeof CommentList>

export const WithoutCommentsDeprecated: Story = {}
export const WithoutCommentsRedesigned: Story = {}

export const WithCommentsDeprecated: Story = {
  args: {
    comments: mockComments,
  },
}
export const WithCommentsRedesigned: Story = {
  args: {
    comments: mockComments,
  },
}

export const IsLoadingDeprecated: Story = {
  args: {
    isLoading: true,
  },
}
export const IsLoadingRedesigned: Story = {
  args: {
    isLoading: true,
  },
}
