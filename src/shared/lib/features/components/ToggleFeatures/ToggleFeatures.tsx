import type { ReactNode } from 'react'
import type { FeatureFlags } from '@/shared/types/featureFlags'
import { getFeatureFlag } from '../../lib/setGetFeatures'

interface ToggleFeatureProps {
  name: keyof FeatureFlags
  on: ReactNode | null
  off: ReactNode | null
}

export const ToggleFeature = ({
  on,
  off,
  name,
}: ToggleFeatureProps): ReactNode | null => {
  if (getFeatureFlag(name)) {
    return on
  }

  return off
}
