import type { ReactNode } from 'react'
import React from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { Drawer } from '../Drawer'
import { Card } from '../Card'
import { Overlay } from '../Overlay'
import { HStack } from '../Stack'
import { Portal } from '../Portal/Portal'
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
  onClose: () => void
  /**
   * @description Flag to render modal only when it is open
   */
  lazy?: boolean
}

/**
 * Show modal with overlay. On mobile shows drawer.
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

  const { isMobile } = useDevice()

  if (lazy && !isMounted) {
    return null
  }

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} className={className} onClose={onClose}>
        {children}
      </Drawer>
    )
  }

  return (
    <Portal>
      <HStack
        maxHeight
        maxWidth
        justify='center'
        align='center'
        className={classNames(styles.modal, mods, [className])}
      >
        <Overlay onClick={close} className={styles.overlay} />
        <Card background='light' className={styles.content}>
          {children}
        </Card>
      </HStack>
    </Portal>
  )
}
