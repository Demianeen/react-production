import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { LoadLexicalProvider } from './LoadLexicalProvider'
import { getAsyncLexicalModules } from '../lib/getAsyncLexicalModules'
import type { Lexical } from '../types/lexical'
import { LexicalContext } from './LexicalContext'

/** Asynchronously load lexical libs */
export const LexicalProvider = ({ children }: PropsWithChildren) => {
  const LexicalRef = useRef<Lexical>()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    getAsyncLexicalModules().then((Lexical) => {
      LexicalRef.current = Lexical
      setIsLoaded(true)
    })
  }, [])

  const value = useMemo(
    () => ({
      ...LexicalRef.current,
      isLoaded,
    }),
    [isLoaded],
  )

  return (
    <LexicalContext.Provider value={value}>
      <LoadLexicalProvider>{children}</LoadLexicalProvider>
    </LexicalContext.Provider>
  )
}
