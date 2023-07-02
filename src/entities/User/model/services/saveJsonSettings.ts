import { buildAsyncThunk } from '@/shared/ui/deprecated/store/buildAsyncThunk'
import { JSON_SETTINGS_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
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
        const jsonSettings = {
          ...currentSettings,
          ...newJsonSettings,
        }
        localStorage.setItem(
          JSON_SETTINGS_LOCALSTORAGE_KEY,
          JSON.stringify(jsonSettings)
        )

        const response = await dispatch(
          setJsonSettingsMutation({
            userId,
            jsonSettings,
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
