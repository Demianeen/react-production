import { useContext } from 'react'
import { AnimationContext } from './AnimationContext'
import type { AnimationContextPayload } from './AnimationContext'

export const useAnimationLibs = () => {
  return useContext(
    AnimationContext
  ) as Required<AnimationContextPayload>
}
