import { buildAsyncThunk } from '@/shared/ui/store/buildAsyncThunk'
import { USER_ID_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
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

    if (!response) {
      return rejectWithValue('error')
    }

    return response
  } catch (error) {
    return rejectWithValue('error')
  }
})
