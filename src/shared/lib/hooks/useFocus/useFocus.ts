import { useCallback, useMemo, useState } from 'react'

interface UseFocusBind {
  onBlur: () => void
  onFocus: () => void
}

export type UseFocusReturnType = [boolean, UseFocusBind]

/**
 * Tracks if an element is focused or not.
 * @returns {[boolean, {onBlur: () => void, onFocus: () => void}]}
 */
export const useFocus = (): UseFocusReturnType => {
  const [isFocused, setIsFocused] = useState(false)

  const onBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const onFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return useMemo(
    () => [isFocused, { onBlur, onFocus }],
    [isFocused, onBlur, onFocus]
  )
}
