import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getAsyncAnimationModules } from '../lib/getAsyncAnimationModules'
import type { Gesture, Spring } from './AnimationContext'
import { AnimationContext } from './AnimationContext'

// animation provider not in app because we use it not globally, but only where we need animations

/** Asynchronously load animation libs */
export const AnimationProvider = ({
  children,
}: PropsWithChildren) => {
  const SpringRef = useRef<Spring>()
  const GestureRef = useRef<Gesture>()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring
      GestureRef.current = Gesture
      setIsLoaded(true)
    })
  }, [])

  const value = useMemo(
    () => ({
      Spring: SpringRef.current,
      Gesture: GestureRef.current,
      isLoaded,
    }),
    [isLoaded],
  )

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  )
}
