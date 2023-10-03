import type { PropsWithChildren } from 'react'
import { useLexicalLibs } from '../lib/useLexicalLibs'

export const LoadLexicalProvider = ({
  children,
}: PropsWithChildren) => {
  const { isLoaded } = useLexicalLibs()

  if (!isLoaded) {
    return null
  }

  return children
}
