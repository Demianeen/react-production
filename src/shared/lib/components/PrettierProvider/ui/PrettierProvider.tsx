import type { PropsWithChildren } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getPrettierOptions } from '../lib/getPrettierOptions'
import { LoadPrettierProvider } from './LoadPrettierProvider'
import type { PrettierStandalone } from '../types/prettier'
import type { PrettierContextPayload } from './PrettierContext'
import { PrettierContext } from './PrettierContext'

/** Asynchronously loads prettier and methods to work with it */
export const PrettierProvider = ({ children }: PropsWithChildren) => {
  const PrettierRef = useRef<PrettierStandalone>()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    import('prettier/standalone').then((Prettier) => {
      PrettierRef.current = Prettier
      setIsLoaded(true)
    })
  }, [])

  const value: PrettierContextPayload = useMemo(
    () => ({
      Prettier: PrettierRef.current,
      isLoaded,
      getPrettierOptions,
    }),
    [isLoaded],
  )

  return (
    <PrettierContext.Provider value={value}>
      <LoadPrettierProvider>{children}</LoadPrettierProvider>
    </PrettierContext.Provider>
  )
}
