import { buildSelector } from '@/shared/ui/deprecated/store'
import type { JsonSettings } from '../types/jsonSettings'
import { getUserAuthData } from './getUserAuthData/getUserAuthData'

// if we will use inline literal {} it will create new object every time
// and it will cause rerender of all components that use this selector
const defaultOptions: JsonSettings = {}

export const [useUserJsonSettings, getUserJsonSettings] =
  buildSelector(
    getUserAuthData,
    (authData) => authData?.jsonSettings ?? defaultOptions
  )

// TODO: Add right types for single selector T[key]
export const [useUserJsonSettingsByKey, getUserJsonSettingsByKey] =
  buildSelector(
    (state, key: keyof JsonSettings) =>
      state.user.authData?.jsonSettings?.[key]
  )

// TODO: Add right types for combiner additional arguments
// export const [useUserJsonSettingsByKey, getUserJsonSettingsByKey] =
//   buildSelector(
//     useUserJsonSettings,
//     (_: StateSchema, key: keyof JsonSettings) => key,
//     (jsonSettings, key) => jsonSettings?.[key]
//   )
