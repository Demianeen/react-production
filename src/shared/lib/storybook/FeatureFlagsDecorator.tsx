import type { FeatureFlags } from '@/shared/types/featureFlags'
import type { StoryFn } from '@storybook/react'
import { useEffect } from 'react'
import { getAllFeatureFlags } from '../features/lib/setGetFeatures'
import { setFeatureFlags } from '../features'

export const FeatureFlagsDecorator =
  (featureFlags: FeatureFlags) => (StoryComponent: StoryFn) => {
    const oldFeatureFlags = getAllFeatureFlags()
    setFeatureFlags({
      ...oldFeatureFlags,
      ...featureFlags,
    } as FeatureFlags)

    useEffect(() => {
      return () => {
        setFeatureFlags(null)
      }
    }, [])

    return <StoryComponent />
  }
