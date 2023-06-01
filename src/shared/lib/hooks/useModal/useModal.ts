import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface UseModalProps {
  isOpen: boolean
  onClose?: () => void
  animationTime?: number
}

/**
 * @description Reusable hook for modal components (modal/drawer)
 *
 * @param {boolean} isOpen
 * @param {(() => void) | undefined} onClose
 * @param {number | undefined} animationTime
 * @returns {{isMounted: boolean, isClosing: boolean, close: () => void}}
 */
export const useModal = ({
  isOpen,
  onClose,
  animationTime = 0,
}: UseModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const timeRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  const close = useCallback(() => {
    if (!onClose) return

    setIsClosing(true)
    timeRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, animationTime)
  }, [animationTime, onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    },
    [close]
  )

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (timeRef.current !== null) {
        clearTimeout(timeRef.current)
      }
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  return {
    close,
    isClosing,
    isMounted,
  }
}
