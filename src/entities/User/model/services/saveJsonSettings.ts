import { buildAsyncThunk } from '@/shared/ui/store/buildAsyncThunk'
import { setJsonSettingsMutation } from '../api/userApi'
import { getUserId } from '../selectors/getUserId/getUserId'
import { getUserJsonSettings } from '../selectors/jsonSettings'
import type { JsonSettings } from '../types/jsonSettings'

export const [useSaveJsonSettings, saveJsonSettings] =
  buildAsyncThunk<JsonSettings, JsonSettings, string>(
    'user/saveJsonSettings',
    async (
      newJsonSettings,
      { rejectWithValue, getState, dispatch }
    ) => {
      const userId = getUserId(getState())
      const currentSettings = getUserJsonSettings(getState())

      if (!userId) {
        return rejectWithValue('error')
      }

      try {
        const response = await dispatch(
          setJsonSettingsMutation({
            userId,
            jsonSettings: { ...currentSettings, ...newJsonSettings },
          })
        ).unwrap()

        if (!response.jsonSettings) {
          return rejectWithValue('error')
        }

        return response.jsonSettings
      } catch (error) {
        return rejectWithValue('error')
      }
    }
  )
