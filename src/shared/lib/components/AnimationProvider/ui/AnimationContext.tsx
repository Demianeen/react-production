import { createContext } from 'react'

export type Spring = typeof import('@react-spring/web')
export type Gesture = typeof import('@use-gesture/react')

export interface AnimationContextPayload {
  isLoaded: boolean
  readonly Spring?: Spring
  readonly Gesture?: Gesture
}

export const AnimationContext =
  createContext<AnimationContextPayload>({
    isLoaded: false,
  })
