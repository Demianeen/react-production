import { useEffect, useState } from 'react'

export const useWindowScroll = () => {
  const [windowScroll, setWindowScroll] = useState(
    document.getElementById('mainLayout')
  )

  useEffect(() => {
    console.log('windowScroll', document.getElementById('mainLayout'))
    setWindowScroll(document.getElementById('mainLayout'))
  }, [])

  return windowScroll
}
