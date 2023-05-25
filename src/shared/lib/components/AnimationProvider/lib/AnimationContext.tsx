import { createContext } from 'react'

/* eslint-disable @typescript-eslint/consistent-type-imports */
export type Spring = typeof import('@react-spring/web')
export type Gesture = typeof import('@use-gesture/react')

/* eslint-enable @typescript-eslint/consistent-type-imports */

export interface AnimationContextPayload {
  isLoaded: boolean
  readonly Spring?: Spring
  readonly Gesture?: Gesture
}

export const AnimationContext =
  createContext<AnimationContextPayload>({
    isLoaded: false,
  })
