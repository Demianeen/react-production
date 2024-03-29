import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { LokiDelayDecorator } from '@/shared/lib/storybook/LokiDelayDecorator'
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated'

export default {
  title: 'entities/Article/ArticleDetails/deprecated',
  component: ArticleDetailsDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [LokiDelayDecorator()],
} as Meta<typeof ArticleDetailsDeprecated>

type Story = StoryObj<typeof ArticleDetailsDeprecated>
export const Light: Story = {}

export const Loading: Story = {}

export const Error: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
