import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader'

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof ArticleDetailsPageHeader>

type Story = StoryObj<typeof ArticleDetailsPageHeader>
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
