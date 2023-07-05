import { useState, useEffect, useMemo } from 'react'

export const useTab = () => {
  const [isTabLastKey, setIsTabLastKey] = useState(false)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsTabLastKey(true)
      } else {
        setIsTabLastKey(false)
      }
    }

    const handleMouseDown = () => {
      setIsTabLastKey(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleMouseDown)
    }
  }, [])

  return useMemo(
    () => ({
      isTabLastKey,
    }),
    [isTabLastKey]
  )
}
