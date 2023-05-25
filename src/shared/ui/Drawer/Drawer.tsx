import type { ReactNode } from 'react'
import React, { useCallback, useEffect } from 'react'
import type { Mods } from 'shared/lib/classNames/classNames'
import { classNames } from 'shared/lib/classNames/classNames'
import { HStack } from 'shared/ui/Stack'
import { Overlay } from 'shared/ui/Overlay/Overlay'
import { Portal } from 'shared/ui/Portal/Portal'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { useAnimationLibs } from 'shared/lib/components/AnimationProvider'
import styles from './Drawer.module.scss'

interface DrawerProps {
  className?: string
  children?: ReactNode
  onClose?: () => void
  isOpen: boolean
  lazy?: boolean
}

const height = window.innerHeight - 210

export const DrawerContent = ({
  className,
  children,
  isOpen,
  onClose,
  lazy = false,
}: DrawerProps) => {
  const { isClosing, isMounted } = useModal({
    isOpen,
    onClose,
    animationTime: 300,
  })
  const { Spring, Gesture } = useAnimationLibs()
  const [{ y }, api] = Spring.useSpring(() => ({
    y: height,
  }))

  const open = useCallback(
    (velocity = 0) => {
      api.start({
        y: 0,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
      })
    },
    [Spring.config.stiff, api]
  )

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    })
  }

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
    }) => {
      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0))
          close(vy)
      } else api.start({ y: my, immediate: true })
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: -200 },
      rubberband: true,
    }
  )

  useEffect(() => {
    if (isOpen) {
      open()
    }
  }, [isOpen, open])

  if (lazy && !isMounted) {
    return null
  }

  const display = y.to((py) => {
    return py < height ? 'block' : 'none'
  })

  if (!isOpen) return null

  const mods: Mods = {
    [styles.closing]: isClosing,
    [styles.opened]: isOpen,
  }

  return (
    <Portal>
      <HStack
        as={Spring.a.div}
        maxHeight
        maxWidth
        justify='center'
        align='center'
        className={classNames(styles.drawer, mods, [
          className,
          'appStyles',
        ])}
      >
        <Overlay onClick={() => close()} />
        <Spring.a.div
          className={styles.content}
          style={{
            display,
            bottom: `calc(-100vh + ${height - 150}px)`,
            y,
          }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </HStack>
    </Portal>
  )
}

export const Drawer = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs()

  if (!isLoaded) {
    return null
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <DrawerContent {...props} />
}
