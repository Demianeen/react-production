import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { InitUserDecorator } from '@/shared/lib/storybook/InitUserDecorator'
import { ProfileValidationError } from '../../model/const/profileValidationError'
import { EditableProfileCard } from './EditableProfileCard'

export default {
  title: 'features/EditableProfileCard/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    id: 1,
  },
  decorators: [InitUserDecorator(), StoreDecorator()],
} as Meta<typeof EditableProfileCard>

type Story = StoryObj<typeof EditableProfileCard>

export const Light: Story = {}

export const Loading: Story = {
  parameters: {
    reactRouter: {
      searchParams: { isLoading: 'true' },
    },
  },
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      profile: {
        validationErrors: [
          ProfileValidationError.NO_DATA,
          ProfileValidationError.INCORRECT_AGE,
          ProfileValidationError.MISSING_AGE,
          ProfileValidationError.MISSING_FIRST_NAME,
          ProfileValidationError.MISSING_LAST_NAME,
          ProfileValidationError.MISSING_USERNAME,
          ProfileValidationError.MISSING_CITY,
          ProfileValidationError.UNKNOWN_SERVER_ERROR,
        ],
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Red: Story = {
  decorators: [ThemeDecorator(Theme.RED)],
}
