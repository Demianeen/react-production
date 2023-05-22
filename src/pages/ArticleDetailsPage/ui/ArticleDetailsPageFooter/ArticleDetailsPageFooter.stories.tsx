import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { ArticleDetailsPageFooter } from './ArticleDetailsPageFooter'

export default {
  title:
    'pages/ArticleDetailsPage/ArticleDetailsPageFooter',
  component: ArticleDetailsPageFooter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator()],
} as Meta<typeof ArticleDetailsPageFooter>

type Story = StoryObj<typeof ArticleDetailsPageFooter>

export const Light: Story = {}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
