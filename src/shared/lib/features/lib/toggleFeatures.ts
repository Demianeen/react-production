import type { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from './setGetFeatures'

interface ToggleFeature<T> {
  name: keyof FeatureFlags
  on: () => T
  off: () => T
}

export const toggleFeature = <T>({
  on,
  off,
  name,
}: ToggleFeature<T>): T => {
  if (getFeatureFlag(name)) {
    return on()
  }

  return off()
}
