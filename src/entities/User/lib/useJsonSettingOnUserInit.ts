import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useUserJsonSettingsByKey } from '../model/selectors/jsonSettings'
import type { JsonSettings } from '../model/types/jsonSettings'
import { getUserIsInitialized } from '../model/selectors/getUserIsInitialized/getUserIsInitialized'

/**
 * The hook only updates the state twice. First time, when the user data is in the process of initialization and second time when user data initialized. This ensures that the state won't be updated every time the user data changes and that there won't be any jumps in state.
 * @template T - The type of the key in the JsonSettings object.
 * @param key - The key of the setting to update.
 * @param setParam - The setter function to update the corresponding state.
 */

export const useJsonSettingOnUserInit = <
  T extends keyof JsonSettings
>(
  key: T,
  setParam: (param: NonNullable<JsonSettings[T]>) => void
) => {
  const param = useUserJsonSettingsByKey(key) as JsonSettings[T]

  const isUserInitialized = useSelector(getUserIsInitialized)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (param && !isInitialized) {
      setParam(param)

      if (isUserInitialized) {
        setIsInitialized(true)
      }
    }
  }, [param, isInitialized, isUserInitialized, setParam])
}
