import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Spinner } from 'shared/ui/Spinner/Spinner'

interface SpinnerProps {
  children?: ReactNode
}

export const SuspenseWithSpinner = ({
  children,
}: SpinnerProps) => {
  return (
    <Suspense fallback={<Spinner />}>{children}</Suspense>
  )
}
