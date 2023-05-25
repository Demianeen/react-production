import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticleDetails } from './ArticleDetails'

export default {
  title: 'entities/Article/ArticleDetails',
  component: ArticleDetails,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleDetails>

type Story = StoryObj<typeof ArticleDetails>
export const Light: Story = {
  decorators: [StoreDecorator()],
}

export const Loading: Story = {
  decorators: [StoreDecorator()],
}

export const Error: Story = {
  decorators: [StoreDecorator()],
}

export const Dark: Story = {
  decorators: [
    StoreDecorator(),
    ThemeDecorator(Theme.DARK),
  ],
}

export const Red: Story = {
  decorators: [StoreDecorator(), ThemeDecorator(Theme.RED)],
}
