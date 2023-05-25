import { useContext } from 'react'
import type { AnimationContextPayload } from 'shared/lib/components/AnimationProvider/lib/AnimationContext'
import { AnimationContext } from 'shared/lib/components/AnimationProvider/lib/AnimationContext'

export const useAnimationLibs = () => {
  return useContext(
    AnimationContext
  ) as Required<AnimationContextPayload>
}
