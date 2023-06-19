import { useEffect, useState } from 'react'

export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.matchMedia('(pointer:coarse)').matches)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
