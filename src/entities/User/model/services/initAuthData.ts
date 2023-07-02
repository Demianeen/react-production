import { buildAsyncThunk } from '@/shared/lib/store/buildAsyncThunk'
import {
  JSON_SETTINGS_LOCALSTORAGE_KEY,
  USER_ID_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage'
import type { User } from '../types/userSchema'
import { getUserAuthDataByIdQuery } from '../api/userApi'

export const [useInitAuthData, initAuthData] = buildAsyncThunk<
  User,
  void,
  string
>('user/initAuthData', async (_, { rejectWithValue, dispatch }) => {
  const userId = localStorage.getItem(USER_ID_LOCALSTORAGE_KEY)

  if (!userId) {
    return rejectWithValue('error')
  }

  try {
    const response = await dispatch(
      getUserAuthDataByIdQuery(JSON.parse(userId))
    ).unwrap()
    console.log('response', response)

    if (!response) {
      return rejectWithValue('error')
    }

    if (response.jsonSettings) {
      localStorage.setItem(
        JSON_SETTINGS_LOCALSTORAGE_KEY,
        JSON.stringify(response.jsonSettings)
      )
    }

    return response
  } catch (error) {
    return rejectWithValue('error')
  }
})
