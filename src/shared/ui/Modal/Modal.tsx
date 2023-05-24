import type { ReactNode } from 'react'
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { Overlay } from 'shared/ui/Overlay/Overlay'
import { HStack } from 'shared/ui/Stack'
import { Portal } from '../Portal/Portal'
import styles from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_TIME = 300

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy = false,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const timeRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

  const closeHandler = useCallback(() => {
    if (!onClose) return

    setIsClosing(true)
    timeRef.current = setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, ANIMATION_TIME)
  }, [onClose])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
      if (timeRef.current !== null) {
        clearTimeout(timeRef.current)
      }
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])

  const mods: Mods = {
    [styles.isClosing]: isClosing,
  }

  if (lazy && !isOpen) {
    return null
  }

  return (
    <Portal>
      <HStack
        maxHeight
        maxWidth
        justify='center'
        align='center'
        className={classNames(styles.modal, mods, [
          className,
          'appStyles',
        ])}
      >
        <Overlay onClick={closeHandler} />
        <div className={styles.content}>{children}</div>
      </HStack>
    </Portal>
  )
}
