import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticleDetailsHeader } from './ArticleDetailsHeader'

export default {
  title: 'entities/Article/ArticleDetailsHeader',
  component: ArticleDetailsHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleDetailsHeader>

type Story = StoryObj<typeof ArticleDetailsHeader>
const store = {
  articleDetails: {
    data: {
      user: {
        id: 1,
      },
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

export const CanEdit: Story = {
  decorators: [StoreDecorator(store)],
}

export const CannotEdit: Story = {
  decorators: [
    StoreDecorator({
      ...store,
      articleDetails: {
        data: {
          user: {
            id: 2,
          },
        },
      },
    }),
  ],
}
