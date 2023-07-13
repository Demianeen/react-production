import type { StoryFn, StoryContext } from '@storybook/react'
import type { FeatureFlags } from '@/shared/types/featureFlags'
import { useLayoutEffect } from 'react'
import { getAllFeatureFlags } from '../features/lib/setGetFeatures'
import { setFeatureFlags, toggleFeature } from '../features'

// toggle design based on story title
export const ToggleDesignDecorator = (newDesign?: boolean) =>
  function Decorator(
    StoryComponent: StoryFn,
    { title, name }: StoryContext
  ) {
    useLayoutEffect(() => {
      const lowerCaseTitle = title.toLowerCase() + name.toLowerCase()
      const isAppRedesigned =
        newDesign ?? lowerCaseTitle.includes('redesigned')

      document.body.classList.remove('appRedesigned', 'app')

      const featureFlags = getAllFeatureFlags()

      setFeatureFlags({
        ...featureFlags,
        isAppRedesigned,
      } as FeatureFlags)

      const className = toggleFeature({
        name: 'isAppRedesigned',
        on: () => 'appRedesigned',
        off: () => 'app',
      })

      document.body.classList.add(className)
    }, [title, name])

    return <StoryComponent />
  }
