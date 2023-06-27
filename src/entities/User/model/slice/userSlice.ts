import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { AUTH_DATA_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'
import type { User, UserSchema } from '../types/userSchema'

const initialState: UserSchema = { _isInitialized: false }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload
      setFeatureFlags(action.payload.features)
    },
    setAuthDataFromLocalStorage: (state) => {
      const authData = localStorage.getItem(
        AUTH_DATA_LOCALSTORAGE_KEY
      )
      // we need the ability to set auth data to undefined for tests
      const user: User | undefined =
        JSON.parse(authData ?? 'null') ?? undefined
      state.authData = user
      state._isInitialized = true
      setFeatureFlags(user?.features)
    },
    logout: (state) => {
      localStorage.removeItem(AUTH_DATA_LOCALSTORAGE_KEY)
      state.authData = undefined
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
