import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { EditArticle } from './EditArticle'

export default {
  title: 'features/EditArticle',
  component: EditArticle,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  parameters: {},
} as Meta<typeof EditArticle>

type Story = StoryObj<typeof EditArticle>

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

const canEdit = {
  decorators: [StoreDecorator(store)],
}

export const CanEditDeprecated: Story = canEdit
export const CanEditRedesigned: Story = canEdit

const cannotEdit = {
  parameters: {
    loki: {
      // because when we cannot edit, this component is not rendered
      skip: true,
    },
  },
}

export const CannotEditDeprecated: Story = cannotEdit
export const CannotEditRedesigned: Story = cannotEdit
