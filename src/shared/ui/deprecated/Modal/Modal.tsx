import type { ReactNode } from 'react'
import React from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay'
import { HStack } from '../../Stack'
import { Portal } from '../../Portal/Portal'
import styles from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  /**
   * @description Flag to show/hide modal
   */
  isOpen: boolean
  /**
   * @description Callback to close modal
   */
  onClose?: () => void
  /**
   * @description Flag to render modal only when it is open
   */
  lazy?: boolean
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
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
    [styles.closed]: !isOpen && !isClosing,
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
