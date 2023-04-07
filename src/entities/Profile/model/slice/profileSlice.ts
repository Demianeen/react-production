import type { ProfileSchema } from 'entities/Profile'
import { createSlice } from '@reduxjs/toolkit'

const initialState: ProfileSchema = {
  isLoading: false,
  isReadonly: true,
  error: undefined,
  data: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
export const { name: profileSliceName } = profileSlice
