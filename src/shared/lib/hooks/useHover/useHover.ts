import { useCallback, useMemo, useState } from 'react'

interface UseMouseBind {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export type UseHoverReturnType = [boolean, UseMouseBind]

/**
 * Tracks if an element is hovered or not.
 * @returns {[boolean, {onMouseEnter: () => void, onMouseLeave: () => void}]}
 */
export const useHover = (): UseHoverReturnType => {
  const [isHover, setIsHover] = useState(false)

  const onMouseEnter = useCallback(() => {
    setIsHover(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHover(false)
  }, [])

  return useMemo(
    () => [isHover, { onMouseEnter, onMouseLeave }],
    [isHover, onMouseEnter, onMouseLeave]
  )
}
