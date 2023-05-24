import type { ReactNode } from 'react'
import React, { memo } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { HStack } from 'shared/ui/Stack'
import { Overlay } from 'shared/ui/Overlay/Overlay'
import { Portal } from 'shared/ui/Portal/Portal'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import styles from './Drawer.module.scss'

interface DrawerProps {
  className?: string
  children?: ReactNode
  onClose?: () => void
  isOpen: boolean
  lazy?: boolean
}

export const Drawer = memo(
  ({
    className,
    children,
    isOpen,
    onClose,
    lazy = false,
  }: DrawerProps) => {
    const { isClosing, close, isMounted } = useModal({
      isOpen,
      onClose,
      animationTime: 300,
    })

    const mods: Mods = {
      [styles.closing]: isClosing,
      [styles.opened]: isOpen,
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
          className={classNames(styles.drawer, mods, [
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
)

Drawer.displayName = 'Drawer'
