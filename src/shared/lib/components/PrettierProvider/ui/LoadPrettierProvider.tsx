import type { PropsWithChildren } from 'react'
import { usePrettier } from '../lib/usePrettier'

export const LoadPrettierProvider = ({
  children,
}: PropsWithChildren) => {
  const { isLoaded } = usePrettier()

  if (!isLoaded) {
    return null
  }

  return children
}
