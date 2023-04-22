import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { Profile } from '../../types/profileSchema'

export const fetchProfileDataById = createAsyncThunk<
  Profile,
  number,
  ThunkConfig<string>
>(
  'profile/fetchProfileDataById',
  async (profileId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get(
        `/profile/${profileId}`
      )

      if (!response.data) {
        return rejectWithValue('error')
      }

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
