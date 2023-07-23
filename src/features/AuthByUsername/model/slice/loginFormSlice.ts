import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import type { LoginFormSchema } from '../types/loginFormSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

const initialState: LoginFormSchema = {
  isLoading: false,
  password: '',
  username: '',
}

export const loginFormSlice = buildSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false
        if (typeof action.payload === 'string') {
          state.error = action.payload
        }
      })
  },
})

export const {
  actions: loginActions,
  reducer: loginReducer,
  useActions: useLoginActions,
} = loginFormSlice
