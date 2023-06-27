import type { FeatureFlags } from '@/shared/types/featureFlags'

// features not change during runtime, so there is no need for them to be reactive
// if user is not logged in, feature flags will be undefined
let featureFlags: FeatureFlags | undefined

export const setFeatureFlags = (flags: FeatureFlags | undefined) => {
  featureFlags = flags
}

export const getFeatureFlag = <K extends keyof FeatureFlags>(
  key: K
): FeatureFlags[K] => {
  return featureFlags?.[key] ?? false
}
