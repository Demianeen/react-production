import type { Meta, StoryObj } from '@storybook/react'
import { ThemeDecorator } from '@/shared/lib/storybook/ThemeDecorator'
import { Theme } from '@/shared/const/theme'
import { StoreDecorator } from '@/shared/lib/storybook/StoreDecorator'
import { RegistrationValidationError } from '../../../model/const/registrationValidationError'
import RegistrationFormDeprecated from './RegistrationFormDeprecated'

export default {
  title: 'features/RegistrationForm/deprecated',
  component: RegistrationFormDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Text',
  },
} as Meta<typeof RegistrationFormDeprecated>

type Story = StoryObj<typeof RegistrationFormDeprecated>
export const Light: Story = {}

export const WithValue: Story = {
  decorators: [
    StoreDecorator({
      registrationForm: {
        username: 'username',
        password: 'password',
        confirmPassword: 'password',
      },
    }),
  ],
}

export const Error: Story = {
  decorators: [
    StoreDecorator({
      registrationForm: {
        errors: [
          RegistrationValidationError.INVALID_USERNAME,
          RegistrationValidationError.PASSWORD_TOO_SHORT,
          RegistrationValidationError.PASSWORDS_DO_NOT_MATCH,
          RegistrationValidationError.MISSING_PASSWORD,
          RegistrationValidationError.MISSING_CONFIRM_PASSWORD,
          RegistrationValidationError.MISSING_USERNAME,
          RegistrationValidationError.USER_ALREADY_EXIST,
          RegistrationValidationError.UNKNOWN_SERVER_ERROR,
        ],
      },
    }),
  ],
}

export const Loading: Story = {
  decorators: [
    StoreDecorator({
      registrationForm: {
        isLoading: true,
      },
    }),
  ],
}

export const Dark: Story = {
  decorators: [ThemeDecorator(Theme.DARK)],
}

export const Orange: Story = {
  decorators: [ThemeDecorator(Theme.ORANGE)],
}
