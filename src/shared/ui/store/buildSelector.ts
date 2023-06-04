import type { StateSchema } from '@/app/providers/StoreProvider'
import { useSelector } from 'react-redux'

type Selector<T> = (
  state: StateSchema,
  ...options: any[]
) => T

type Result<T> = [() => T, Selector<T>]

// TODO: Add reselect support
/**
 * @description create a selector that automatically wraps the selector in a useSelector hook
 * @param {Selector<T>} selector
 * @returns {Result<T>}
 */
export const buildSelector = <T>(
  selector: Selector<T>
): Result<T> => {
  const useSelectorHook = () => {
    return useSelector(selector)
  }

  return [useSelectorHook, selector]
}
