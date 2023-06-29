import type { ReactElement } from 'react'
import type { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from '../setGetFeatures'

interface ToggleFeatureProps {
  name: keyof FeatureFlags
  on: ReactElement | null
  off: ReactElement | null
}

export const ToggleFeature = ({
  on,
  off,
  name,
}: ToggleFeatureProps): ReactElement | null => {
  if (getFeatureFlag(name)) {
    return on
  }

  return off
}
