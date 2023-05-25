import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/StoreProvider'
import type { Profile } from '@/entities/Profile'
import { ProfileValidationError } from '@/features/EditableProfileCard/model/const/profileValidationError'
import { validateProfileForm } from '../validateProfileForm/validateProfileForm'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'

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
      `/profile/${formData?.id}`,
      formData
    )

    if (response.data == null) {
      return rejectWithValue([
        ProfileValidationError.UNKNOWN_SERVER_ERROR,
      ])
    }

    return response.data
  } catch (e) {
    return rejectWithValue([
      ProfileValidationError.UNKNOWN_SERVER_ERROR,
    ])
  }
})
