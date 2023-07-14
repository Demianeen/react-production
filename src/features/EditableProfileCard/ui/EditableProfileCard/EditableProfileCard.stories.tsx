import type { Meta, StoryObj } from '@storybook/react'
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
  decorators: [InitUserDecorator()],
  parameters: {
    // TODO: require msw request to be fullfilled before making a screenshot
    loki: {
      skip: true,
    },
  },
} as Meta<typeof EditableProfileCard>

type Story = StoryObj<typeof EditableProfileCard>

export const PrimaryDeprecated: Story = {}
export const PrimaryRedesigned: Story = {}

const loading = {
  parameters: {
    reactRouter: {
      searchParams: { isLoading: 'true' },
    },
  },
}

export const LoadingDeprecated: Story = loading
export const LoadingRedesigned: Story = loading

const error = {
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

export const ErrorDeprecated: Story = error
export const ErrorRedesigned: Story = error
