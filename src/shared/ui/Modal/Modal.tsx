import type { ReactNode } from 'react'
import React from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/Overlay/Overlay'
import { HStack } from '@/shared/ui/Stack'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../Portal/Portal'
import styles from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy = false,
}: ModalProps) => {
  const { isClosing, close, isMounted } = useModal({
    isOpen,
    onClose,
    animationTime: 300,
  })

  const mods: Mods = {
    [styles.closing]: isClosing,
  }

  if (lazy && !isMounted) {
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
        <Overlay onClick={close} />
        <div className={styles.content}>{children}</div>
      </HStack>
    </Portal>
  )
}
