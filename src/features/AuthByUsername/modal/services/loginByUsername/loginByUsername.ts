import { createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from 'entities/User'
import { userActions } from 'entities/User'
import { AUTH_DATA_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { ThunkConfig } from 'app/providers/StoreProvider'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>(
  'loginForm/loginByUsername',
  async (
    authData,
    { extra, dispatch, rejectWithValue }
  ) => {
    try {
      const response = await extra.api.post(
        '/login',
        authData
      )

      if (!response.data) {
        return rejectWithValue('error')
      }

      localStorage.setItem(
        AUTH_DATA_LOCALSTORAGE_KEY,
        JSON.stringify(response.data)
      )
      dispatch(userActions.setAuthData(response.data))

      extra.navigate('/about')

      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
