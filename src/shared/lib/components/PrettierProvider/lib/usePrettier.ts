import { useContext } from 'react'
import type { PrettierContextPayload } from '../ui/PrettierContext'
import { PrettierContext } from '../ui/PrettierContext'

/**
 * Wraps prettier context in a useContext
 */
export const usePrettier = () =>
  useContext(
    PrettierContext,
    // just for convenience, we can always create a separate component to wrap and load prettier context
  ) as Required<PrettierContextPayload>
