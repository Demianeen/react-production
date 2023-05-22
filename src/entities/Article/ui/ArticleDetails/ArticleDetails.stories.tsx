import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from 'shared/lib/storybook/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'
import { StoreDecorator } from 'shared/lib/storybook/StoreDecorator'
import { mockArticle } from '../../model/mocks/data'
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
  decorators: [
    StoreDecorator({
      articleDetails: {
        data: mockArticle,
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      articleDetails: {
        isLoading: true,
      },
    }),
  ],
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      articleDetails: {
        error: 'Error',
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}
Dark.decorators = [
  StoreDecorator({
    articleDetails: {
      data: mockArticle,
    },
  }),
]

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
Red.decorators = [
  StoreDecorator({
    articleDetails: {
      data: mockArticle,
    },
  }),
]
