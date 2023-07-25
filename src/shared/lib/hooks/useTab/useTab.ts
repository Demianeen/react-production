import { useEffect, useRef } from 'react'

/**
 * Tracks tab state in the browser.
 * @returns refs due to performance reasons
 */
export const useTab = () => {
  const isTabLastKey = useRef(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        isTabLastKey.current = true
      } else {
        isTabLastKey.current = false
      }
    }

    const handleMouseDown = () => {
      isTabLastKey.current = false
    }

    window.addEventListener('keydown', handleKeyDown)

    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleMouseDown)
    }
  }, [])

  return { isTabLastKey }
}
