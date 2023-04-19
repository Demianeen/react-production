import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import type {
  Profile,
  ProfileSchema,
} from '../types/profileSchema'

const initialState: ProfileSchema = {
  isLoading: false,
  isReadonly: true,
  error: undefined,
  data: undefined,
  form: undefined,
  validationErrors: undefined,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsReadonly: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isReadonly = action.payload
    },
    cancelEdit: (state) => {
      state.form = state.data
      state.isReadonly = true
      state.validationErrors = undefined
    },
    updateProfileForm: (
      state,
      action: PayloadAction<Profile>
    ) => {
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProfileData
      .addCase(fetchProfileData.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchProfileData.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.data = action.payload
          state.form = action.payload
        }
      )
      .addCase(
        fetchProfileData.rejected,
        (state, action) => {
          state.isLoading = false
          state.error = action.payload
        }
      )
      // updateProfileData
      .addCase(updateProfileData.pending, (state) => {
        state.validationErrors = undefined
        state.isLoading = true
      })
      .addCase(
        updateProfileData.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.isReadonly = true
          state.data = action.payload
          state.form = action.payload
          state.validationErrors = undefined
        }
      )
      .addCase(
        updateProfileData.rejected,
        (state, action) => {
          state.isLoading = false
          state.validationErrors = action.payload
        }
      )
  },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
