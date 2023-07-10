import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import CommentFormDeprecated from './CommentFormDeprecated'

export default {
  title: 'entities/CommentForm',
  component: CommentFormDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    onSendComment: action('onSendComment'),
  },
} as Meta<typeof CommentFormDeprecated>

type Story = StoryObj<typeof CommentFormDeprecated>
export const WithoutValue: Story = {}

export const WithValue: Story = {
  decorators: [
    StoreDecorator({
      commentForm: {
        body: 'some value',
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
