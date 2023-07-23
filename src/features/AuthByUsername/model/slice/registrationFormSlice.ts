import { buildSlice } from '@/shared/lib/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import { registerByUsername } from '../services/registerByUsername/registerByUsername'
import type { RegistrationFormSchema } from '../types/registrationFormSchema'

const initialState: RegistrationFormSchema = {
  username: '',
  password: '',
  confirmPassword: '',
  isLoading: false,
}

export const registrationFormSlice = buildSlice({
  name: 'registrationForm',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload
    },
  },
  extraReducers: (builder) => {
    // registerByUsername
    builder.addCase(registerByUsername.pending, (state) => {
      state.isLoading = true
      state.errors = undefined
    })
    builder.addCase(registerByUsername.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(registerByUsername.rejected, (state, action) => {
      state.isLoading = false
      state.errors = action.payload
    })
  },
})

export const {
  actions: registrationFormActions,
  useActions: useRegistrationFormActions,
  reducer: registrationFormReducer,
} = registrationFormSlice
