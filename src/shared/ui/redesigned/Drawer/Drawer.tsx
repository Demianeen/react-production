import type { ReactNode } from 'react'
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider'
import { toggleFeature } from '@/shared/lib/features'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import type {
  FullGestureState,
  UserDragConfig,
} from '@use-gesture/react'
import { HStack } from '../Stack'
import { Overlay } from '../Overlay/Overlay'
import styles from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'

interface DrawerProps {
  className?: string
  children: ReactNode
  /**
   * @description Flag to open/close drawer
   */
  isOpen?: boolean
  /**
   * @description Callback to close drawer
   */
  onClose?: () => void
}
const screenHeight = window.innerHeight

export const DrawerContent = ({
  className,
  children,
  onClose,
  isOpen,
}: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs()

  const contentRef = useRef<HTMLDivElement>(null)

  const [drawerRef, setDrawerRef] = useState<HTMLDivElement | null>(
    null
  )
  const height = drawerRef?.clientHeight || 0

  const [{ y }, api] = Spring.useSpring(
    () => ({
      y: screenHeight,
    }),
    []
  )

  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])

  const openDrawer = useCallback(() => {
    api.start({
      y: 0,
      immediate: false,
      config: { ...Spring.config.stiff },
    })
  }, [Spring.config.stiff, api])

  const close = useCallback(() => {
    console.log('close')
    api.start({
      y: height,
      immediate: false,
      config: Spring.config.wobbly,
      onResolve: handleClose,
    })
  }, [Spring.config.wobbly, api, handleClose, height])

  useEffect(() => {
    if (isOpen) {
      openDrawer()
    }
  }, [api, close, isOpen, openDrawer])

  const onDrag = useCallback(
    ({
      last,
      movement: [, my],
      velocity: [, vy],
      direction: [, dy],
    }: FullGestureState<'drag'>) => {
      if (last) {
        if (my > height * 0.5 || (vy > 0 && dy === -1)) {
          close()
        } else {
          openDrawer()
        }
      } else {
        api.start({ y: my, immediate: true })
      }
    },
    [api, close, height, openDrawer]
  )

  const dragConfig: UserDragConfig = {
    axis: 'y',
    bounds: { top: 0 },
  }

  const handlerBind = Gesture.useDrag((props) => {
    onDrag(props)
  }, dragConfig)

  const contentBind = Gesture.useDrag((props) => {
    if (contentRef?.current?.scrollTop !== 0) {
      // Prevent dragging if content is not scrolled to top
      // eslint-disable-next-line react/prop-types
      props.cancel()
      return
    }

    onDrag(props)
  }, dragConfig)

  return (
    <Portal>
      <div
        className={classNamesNew(
          styles.drawer,
          toggleFeature({
            name: 'isAppRedesigned',
            on: () => styles.redesigned,
            off: () => styles.deprecated,
          }),
          className
        )}
        style={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <Overlay onClick={close} />

        <Spring.a.div
          className={styles.sheet}
          ref={setDrawerRef}
          style={{
            bottom: 0,
            y,
          }}
        >
          <HStack
            maxWidth
            justify='center'
            className={styles.drawerHandler}
            {...handlerBind()}
          >
            <div className={styles.handle} />
          </HStack>
          <Spring.a.div
            ref={contentRef}
            className={styles.content}
            {...contentBind()}
          >
            {children}
          </Spring.a.div>
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
