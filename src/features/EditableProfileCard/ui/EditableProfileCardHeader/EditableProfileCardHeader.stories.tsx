import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { EditableProfileCardHeader } from './EditableProfileCardHeader'

export default {
  title: 'features/EditableProfileCard/EditableProfileCardHeader',
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

const canEdit = {
  decorators: [StoreDecorator(canEditState)],
}

export const CanEditDeprecated: Story = canEdit
export const CanEditRedesigned: Story = canEdit

export const CannotEditDeprecated: Story = {}
export const CannotEditRedesigned: Story = {}
