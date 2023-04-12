import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import { validateProfileForm } from 'features/EditableProfileCard/model/services/validateProfileForm/validateProfileForm'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import type { Profile } from '../../types/profileSchema'
import { ProfileValidationError } from '../../types/profileSchema'

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ProfileValidationError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi

  const formData = getProfileForm(getState())
  const errors = validateProfileForm(formData)

  if (errors.length > 0) {
    return rejectWithValue(errors)
  }

  try {
    const response = await extra.api.put<Profile>(
      '/profile',
      formData
    )

    return response.data
  } catch (e) {
    return rejectWithValue([
      ProfileValidationError.UNKNOWN_SERVER_ERROR,
    ])
  }
})
