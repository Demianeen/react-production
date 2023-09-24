import type { PropsWithChildren } from 'react'
import { memo } from 'react'
import { usePrettier } from '../lib/usePrettier'

export const LoadPrettierProvider = memo(
  ({ children }: PropsWithChildren) => {
    const { isLoaded } = usePrettier()

    if (!isLoaded) {
      return null
    }

    return children
  },
)

LoadPrettierProvider.displayName = 'Drawer'
