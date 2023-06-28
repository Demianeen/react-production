import type { PayloadAction } from '@reduxjs/toolkit'
import { AUTH_DATA_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'
import { buildSlice } from '@/shared/ui/store'
import { saveJsonSettings } from '../services/saveJsonSettings'
import type { User, UserSchema } from '../types/userSchema'

const initialState: UserSchema = {
  _isInitialized: false,
  isJsonLoading: false,
}

export const userSlice = buildSlice({
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
  extraReducers: (builder) => {
    builder
      .addCase(saveJsonSettings.pending, (state) => {
        state.jsonError = undefined
        state.isJsonLoading = true
      })
      .addCase(saveJsonSettings.fulfilled, (state, action) => {
        state.isJsonLoading = false
        if (state.authData) {
          state.authData.jsonSettings = action.payload
        }
      })
      .addCase(saveJsonSettings.rejected, (state, action) => {
        state.isJsonLoading = false
        state.jsonError = action.payload
      })
  },
})

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUserActions,
} = userSlice
