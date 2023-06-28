import { createAsyncThunk } from '@reduxjs/toolkit'
import type { User } from '@/entities/User'
import { userActions } from '@/entities/User'
import { USER_ID_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
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

      localStorage.setItem(
        USER_ID_LOCALSTORAGE_KEY,
        JSON.stringify(response.data)
      )
      dispatch(userActions.setAuthData(response.data))

      // extra.navigate?.('/about')

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
