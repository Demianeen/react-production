import type { ReactNode } from 'react'
import React, { memo, useCallback, useEffect } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider'
import { Overlay } from '../Overlay/Overlay'
import styles from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

const height = window.innerHeight - 100

export const DrawerContent = ({
  className,
  children,
  onClose,
  isOpen,
}: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs()
  const [{ y }, api] = Spring.useSpring(() => ({
    y: height,
  }))

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false })
  }, [api])

  useEffect(() => {
    if (isOpen) {
      openDrawer()
    }
  }, [api, isOpen, openDrawer])

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
      cancel,
    }) => {
      if (my < -70) cancel()

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close()
        } else {
          openDrawer()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  )

  if (!isOpen) {
    return null
  }

  const display = y.to((py) =>
    py < height ? 'block' : 'none'
  )

  return (
    <Portal>
      <div
        className={classNames(styles.drawer, {}, [
          className,
          'appStyles',
        ])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={styles.sheet}
          style={{
            display,
            bottom: `calc(-100vh + ${height - 100}px)`,
            y,
          }}
          {...bind()}
        >
          <div className={styles.handle} />
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  )
}

export const DrawerAsync = memo((props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs()

  if (!isLoaded) {
    return null
  }

  return <DrawerContent {...props} />
})

DrawerAsync.displayName = 'Drawer'

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  )
}
