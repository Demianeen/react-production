import CircleArrowUpIcon from '@/shared/assets/icons/redesigned/circle-arrow-up.svg'
import { useWindowScroll } from '@/shared/lib/scroll/useWindowScroll'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { memo, useCallback, useEffect, useState } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './ScrollToTopButton.module.scss'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo(
  ({ className }: ScrollToTopButtonProps) => {
    const [wasScrolled, setWasScrolled] = useState(false)
    const windowElement = useWindowScroll()

    const onScrollUp = useCallback(() => {
      windowElement?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, [windowElement])

    useEffect(() => {
      console.log(windowElement)
      const onScroll = () => {
        if (!windowElement) {
          return
        }
        console.log(
          'windowElement.scrollTop',
          windowElement.scrollTop
        )
        if (windowElement.scrollTop > 0) {
          setWasScrolled(true)
        } else {
          setWasScrolled(false)
        }
      }

      windowElement?.addEventListener('scroll', onScroll)

      return () => {
        windowElement?.removeEventListener('scroll', onScroll)
      }
    }, [windowElement])

    if (!wasScrolled) {
      return null
    }

    return (
      <Icon
        onClick={onScrollUp}
        Svg={CircleArrowUpIcon}
        className={classNamesNew(styles.button, className)}
      />
    )
  }
)

ScrollToTopButton.displayName = 'ScrollToTop'
