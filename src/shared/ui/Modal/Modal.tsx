import React, {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'
import { useTheme } from 'app/providers/ThemeProvider'
import styles from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
}

const ANIMATION_TIME = 300

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const timeRef =
    React.useRef<ReturnType<typeof setTimeout>>()
  const { theme } = useTheme()

  const closeHandler = useCallback(() => {
    if (!onClose) return

    setIsClosing(true)
    timeRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, ANIMATION_TIME)
  }, [onClose])

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    },
    [closeHandler]
  )

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current)
      }
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods = {
    [styles.opened]: isOpen,
    [styles.isClosing]: isClosing,
  }

  return (
    <Portal>
      <div
        className={classNames(styles.modal, mods, [
          styles[theme],
          className,
        ])}
      >
        <div
          className={styles.overlay}
          onClick={closeHandler}
        >
          <div
            className={styles.content}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
