import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { User } from 'entities/User'
import { userActions } from 'entities/User'
import { AUTH_DATA_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface LoginByUsernameProps {
  username: string
  password: string
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  { rejectValue: string }
>(
  'loginForm/loginByUsername',
  async (authData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/login',
        authData
      )

      if (!response.data) {
        throw new Error()
      }

      localStorage.setItem(
        AUTH_DATA_LOCALSTORAGE_KEY,
        JSON.stringify(response.data)
      )
      thunkAPI.dispatch(
        userActions.setAuthData(response.data)
      )

      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return thunkAPI.rejectWithValue('error')
    }
  }
)
