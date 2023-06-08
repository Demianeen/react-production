import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { EditableProfileCardHeader } from './EditableProfileCardHeader'

export default {
  title:
    'features/EditableProfileCard/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof EditableProfileCardHeader>

type Story = StoryObj<typeof EditableProfileCardHeader>
const canEditState = {
  profile: {
    data: {
      id: 1,
    },
  },
  user: {
    authData: {
      id: 1,
    },
  },
}

export const CanEdit: Story = {
  decorators: [StoreDecorator(canEditState)],
}

export const CannotEdit: Story = {}

export const Dark: Story = {
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator(canEditState),
  ],
}

export const Red: Story = {
  decorators: [
    ThemeDecorator(Theme.RED),
    StoreDecorator(canEditState),
  ],
}
