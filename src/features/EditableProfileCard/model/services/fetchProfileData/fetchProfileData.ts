import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { Profile } from '../../types/profileSchema'

export const fetchProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
>(
  'profile/fetchProfileData',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get('/profile')

      if (!response.data) {
        return rejectWithValue('error')
      }

      return response.data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
