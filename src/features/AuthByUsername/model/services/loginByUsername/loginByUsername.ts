import { createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '@/entities/User'
import { userActions } from '@/entities/User'
import type { ThunkConfig } from '@/app/providers/StoreProvider/config/stateSchema'

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
  async (authData, { extra, dispatch, rejectWithValue }) => {
    try {
      const response = await extra.api.post('/login', authData)

      if (!response.data) {
        return rejectWithValue('error')
      }

      dispatch(userActions.setAuthData(response.data))

      window.location.reload()

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
