import { useDynamicModuleLoader } from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import type { FormEvent } from 'react'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Typography } from '@/shared/ui/redesigned/Typography'
import { ToggleFeature } from '@/shared/lib/features'
import type { AsyncReducersList } from '@/app/providers/StoreProvider/config/stateSchema'
import { RegistrationValidationError } from '../model/const/registrationValidationError'
import { registrationFormReducer } from '../model/slice/registrationFormSlice'
import { useRegistrationFormErrors } from '../model/selectors/registrationSelectors'
import { useRegisterByUsername } from '../model/services/registerByUsername/registerByUsername'

const reducersList: AsyncReducersList = {
  registrationForm: registrationFormReducer,
}

export type OnSuccess = () => void

export const useRegistrationForm = (onSuccess: OnSuccess) => {
  useDynamicModuleLoader(reducersList)
  const { t } = useTranslation()
  const errors = useRegistrationFormErrors()

  const validationErrorMessage: Record<
    RegistrationValidationError,
    string
  > = useMemo(
    () => ({
      [RegistrationValidationError.INVALID_USERNAME]: t(
        'Username cannot contain spaces'
      ),
      [RegistrationValidationError.PASSWORD_TOO_SHORT]: t(
        'Password need to be at least 8 characters long'
      ),
      [RegistrationValidationError.PASSWORDS_DO_NOT_MATCH]: t(
        'Passwords do not match'
      ),
      [RegistrationValidationError.MISSING_PASSWORD]: t(
        'Password is required'
      ),
      [RegistrationValidationError.MISSING_CONFIRM_PASSWORD]: t(
        'You need to confirm password'
      ),
      [RegistrationValidationError.MISSING_USERNAME]: t(
        'Username is required'
      ),
      [RegistrationValidationError.USER_ALREADY_EXIST]: t(
        'User with this username already exists'
      ),
      [RegistrationValidationError.UNKNOWN_SERVER_ERROR]: t(
        'Unknown server error happened'
      ),
    }),
    [t]
  )

  const validationErrors = useMemo(
    () =>
      errors?.map((error) => (
        <ToggleFeature
          key={error}
          name='isAppRedesigned'
          on={
            <Typography key={error} variant='error'>
              {validationErrorMessage[error]}
            </Typography>
          }
          off={
            <Text
              theme={TextTheme.ERROR}
              text={validationErrorMessage[error]}
            />
          }
        />
      )),
    [errors, validationErrorMessage]
  )

  const registerByUsername = useRegisterByUsername()

  const onRegister = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const result = await registerByUsername()

      // @ts-expect-error TODO: fix buildAsyncThunk types
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess()
      }
    },
    [onSuccess, registerByUsername]
  )

  return {
    onRegister,
    validationErrors,
  }
}
