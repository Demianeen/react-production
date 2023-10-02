import { UserRole, type User, userActions } from '@/entities/User'
import { buildAsyncThunk } from '@/shared/lib/store/buildAsyncThunk'
import { AxiosError } from 'axios'
import { RegistrationValidationError } from '../../const/registrationValidationError'
import { validateRegistrationForm } from '../validateRegistrationForm/validateRegistrationForm'
import {
  getRegistrationFormConfirmPassword,
  getRegistrationFormPassword,
  getRegistrationFormUsername,
} from '../../selectors/registrationSelectors'

const isRegistrationError = (
  value: any
): value is RegistrationValidationError =>
  Object.values(RegistrationValidationError).includes(value)

export const [useRegisterByUsername, registerByUsername] =
  buildAsyncThunk<User, undefined, RegistrationValidationError[]>(
    'registrationForm/registerByUsername',
    async (_, { extra, rejectWithValue, getState, dispatch }) => {
      const username = getRegistrationFormUsername(getState())
      const password = getRegistrationFormPassword(getState())
      const confirmPassword = getRegistrationFormConfirmPassword(
        getState()
      )

      const errors = validateRegistrationForm({
        username,
        password,
        confirmPassword,
      })

      if (errors.length > 0) {
        return rejectWithValue(errors)
      }

      try {
        const { data } = await extra.api.post<User>('/register', {
          username,
          password,
          roles: [UserRole.USER],
        })

        if (!data) {
          return rejectWithValue([
            RegistrationValidationError.UNKNOWN_SERVER_ERROR,
          ])
        }

        dispatch(userActions.setAuthData(data))

        window.location.reload()

        return data
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage = error.response?.data?.message
          if (isRegistrationError(errorMessage)) {
            return rejectWithValue([errorMessage])
          }
        }

        return rejectWithValue([
          RegistrationValidationError.UNKNOWN_SERVER_ERROR,
        ])
      }
    }
  )
