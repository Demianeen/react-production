import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { mockComments } from '../../model/mocks/mockCommentEntities'
import { CommentList } from './CommentList'

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof CommentList>

type Story = StoryObj<typeof CommentList>
export const WithoutComments: Story = {}

export const WithComments: Story = {
  args: {
    comments: mockComments,
  },
}

export const IsLoading: Story = {
  args: {
    isLoading: true,
  },
}

export const Dark: Story = {
  args: {
    comments: mockComments,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  args: {
    comments: mockComments,
  },
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
