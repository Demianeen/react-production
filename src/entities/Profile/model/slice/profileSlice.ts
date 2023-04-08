import type { ProfileSchema } from 'entities/Profile'
import { createSlice } from '@reduxjs/toolkit'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.data = action.payload
        }
      )
      .addCase(
        fetchProfileData.rejected,
        (state, action) => {
          state.isLoading = false
          if (typeof action.payload === 'string') {
            state.error = action.payload
          }
        }
      )
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
export const { name: profileSliceName } = profileSlice
