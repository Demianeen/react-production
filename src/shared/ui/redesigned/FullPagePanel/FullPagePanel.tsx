import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import CloseIcon from '@/shared/assets/icons/redesigned/close.svg'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import {
  useCallback,
  useState,
  type ReactNode,
  memo,
  useEffect,
} from 'react'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import {
  AnimationProvider,
  useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider'
import { Button, ButtonTheme } from '../../deprecated/Button'
import { Br } from '../Br'
import { HStack } from '../Stack'
import { Icon } from '../Icon'
import styles from './FullPagePanel.module.scss'
import { Icon as IconDeprecated } from '../../deprecated/Icon'

export interface FullPagePanelProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
  children?: ReactNode
}

const screenWidth = window.innerWidth

export const FullPagePanelContent = typedMemo(
  ({
    className,
    onClose,
    isOpen = false,
    children,
  }: FullPagePanelProps) => {
    const { Spring, Gesture } = useAnimationLibs()

    const [{ x }, api] = Spring.useSpring(
      () => ({
        x: 0,
      }),
      []
    )

    // to run animation
    const [isClosed, setIsClosed] = useState(true)

    const handleClose = useCallback(() => {
      setIsClosed(true)
      onClose?.()
    }, [onClose])

    const openPanel = useCallback(() => {
      api.start({
        x: 0,
        immediate: true,
      })
    }, [api])

    const close = useCallback(() => {
      api.start({
        x: -screenWidth,
        immediate: false,
        config: Spring.config.gentle,
        onRest: handleClose,
      })
    }, [Spring.config.gentle, api, handleClose])

    useEffect(() => {
      if (isOpen) {
        setIsClosed(false)
        openPanel()
      } else if (!isClosed) {
        setIsClosed(true)
      }
    }, [api, close, handleClose, isClosed, isOpen, openPanel])

    const bind = Gesture.useDrag(
      ({ last, movement: [mx], velocity: [vx], direction: [dx] }) => {
        if (last) {
          if (-mx > screenWidth * 0.5 || (vx > 0.6 && dx === -1)) {
            close()
          } else {
            openPanel()
          }
        } else {
          api.start({ x: mx, immediate: true })
        }
      },
      {}
    )

    if (isClosed) {
      return null
    }

    return (
      <Spring.a.div
        className={classNamesNew(
          toggleFeature({
            name: 'isAppRedesigned',
            on: () => styles.fullPagePanel,
            off: () => styles.fullPagePanelDeprecated,
          }),
          {},
          className
        )}
        style={{
          x,
        }}
        {...bind()}
      >
        <HStack maxWidth justify='end'>
          <ToggleFeature
            name='isAppRedesigned'
            on={
              <Icon
                Svg={CloseIcon}
                onClick={handleClose}
                tooltipText='Close'
                tooltipPosition='left'
              />
            }
            off={
              <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                type='button'
                onClick={onClose}
              >
                <IconDeprecated
                  Svg={CloseIcon}
                  height={24}
                  width={24}
                />
              </Button>
            }
          />
        </HStack>
        <Br />
        {children}
      </Spring.a.div>
    )
  }
)

export const FullPagePanelAsync = memo(
  (props: FullPagePanelProps) => {
    const { isLoaded } = useAnimationLibs()

    if (!isLoaded) {
      return null
    }

    return <FullPagePanelContent {...props} />
  }
)

FullPagePanelAsync.displayName = 'FullPagePanelAsync'

export const FullPagePanel = (props: FullPagePanelProps) => {
  return (
    <AnimationProvider>
      <FullPagePanelAsync {...props} />
    </AnimationProvider>
  )
}
