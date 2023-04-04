import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { AUTH_DATA_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { User, UserSchema } from '../types/user'

const initialState: UserSchema = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
    },
    setAuthDataFromLocalStorage: (state) => {
      const authData = localStorage.getItem(
        AUTH_DATA_LOCALSTORAGE_KEY
      )
      if (authData) {
        state.authData = JSON.parse(authData)
      }
    },
    logout: (state) => {
      localStorage.removeItem(AUTH_DATA_LOCALSTORAGE_KEY)
      state.authData = undefined
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
export const { name: userSliceName } = userSlice
