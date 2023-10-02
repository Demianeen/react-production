import { FEATURE_FLAGS_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import type { FeatureFlags } from '@/shared/types/featureFlags'

// settings while user is being initialized
const loadingSettings = JSON.parse(
  localStorage.getItem(FEATURE_FLAGS_LOCALSTORAGE_KEY) ?? 'null'
)

// features not change during runtime, so there is no need for them to be reactive
// if user is not logged in, feature flags will be set to null in userSlice
let featureFlags: FeatureFlags | null = loadingSettings

export const setFeatureFlags = (
  flags: FeatureFlags | null | undefined
) => {
  if (flags === undefined) {
    return
  }

  featureFlags = flags
  localStorage.setItem(
    FEATURE_FLAGS_LOCALSTORAGE_KEY,
    JSON.stringify(flags)
  )
}

export const getFeatureFlag = <K extends keyof FeatureFlags>(
  key: K
): boolean => featureFlags?.[key] ?? false

export const getAllFeatureFlags = (): FeatureFlags | null =>
  featureFlags
