import type { PayloadAction } from '@reduxjs/toolkit'
import {
  JSON_SETTINGS_LOCALSTORAGE_KEY,
  USER_ID_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage'
import { setFeatureFlags } from '@/shared/lib/features'
import { buildSlice } from '@/shared/lib/store'
import { initAuthData } from '../services/initAuthData'
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
      localStorage.setItem(
        USER_ID_LOCALSTORAGE_KEY,
        JSON.stringify(action.payload.id)
      )
    },
    logout: (state) => {
      localStorage.removeItem(USER_ID_LOCALSTORAGE_KEY)
      state.authData = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      // saveJsonSettings
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
      // initAuthData
      .addCase(initAuthData.pending, (state, action) => {
        const jsonSettings = localStorage.getItem(
          JSON_SETTINGS_LOCALSTORAGE_KEY
        )

        if (jsonSettings) {
          state.authData = {} as User
          state.authData.jsonSettings = JSON.parse(jsonSettings)
        }
      })
      .addCase(initAuthData.fulfilled, (state, action) => {
        state.authData = action.payload
        setFeatureFlags(action.payload?.features)
        state._isInitialized = true
      })
      .addCase(initAuthData.rejected, (state) => {
        // we need to set flag to true to load app
        state._isInitialized = true
        state.authData = undefined
      })
  },
})

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUserActions,
} = userSlice
