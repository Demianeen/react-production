import { useContext } from 'react'
import { AnimationContext } from '../ui/AnimationContext'
import type { AnimationContextPayload } from '../ui/AnimationContext'

export const useAnimationLibs = () => {
  return useContext(
    AnimationContext,
  ) as Required<AnimationContextPayload>
}
