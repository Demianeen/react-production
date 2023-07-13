import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned'

export default {
  title: 'entities/Article/ArticleDetails/redesigned',
  component: ArticleDetailsRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleDetailsRedesigned>

type Story = StoryObj<typeof ArticleDetailsRedesigned>
export const Light: Story = {}

export const Loading: Story = {}

export const Error: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
