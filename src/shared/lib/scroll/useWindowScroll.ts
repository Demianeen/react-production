import { useEffect, useState } from 'react'

export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState(
    document.getElementById('mainLayout')
  )

  useEffect(() => {
    setWindowScroll(document.getElementById('mainLayout'))
  }, [])

  return windowScroll
}
