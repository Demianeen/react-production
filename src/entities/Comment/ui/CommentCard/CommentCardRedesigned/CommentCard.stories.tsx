import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { mockComments } from '../../../model/mocks/mockCommentEntities'
import { CommentCardRedesigned } from './CommentCard'

export default {
  title: 'entities/Comment/CommentCard/redesigned',
  component: CommentCardRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    comment: mockComments[0],
  },
} as Meta<typeof CommentCardRedesigned>

type Story = StoryObj<typeof CommentCardRedesigned>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
