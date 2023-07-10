import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { mockComments } from '../../../model/mocks/mockCommentEntities'
import { CommentCardDeprecated } from './CommentCard'

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCardDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    comment: mockComments[0],
  },
} as Meta<typeof CommentCardDeprecated>

type Story = StoryObj<typeof CommentCardDeprecated>
export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
