import CircleArrowUpIcon from '@/shared/assets/icons/redesigned/circle-arrow-up.svg'
import { useWindowScroll } from '@/shared/lib/scroll/useWindowScroll'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { memo, useCallback, useEffect, useState } from 'react'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo(
  ({ className }: ScrollToTopButtonProps) => {
    const [wasScrolled, setWasScrolled] = useState(false)
    const windowElement = useWindowScroll()
    console.log('windowElement', windowElement)

    const onScrollUp = useCallback(() => {
      windowElement?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, [windowElement])

    useEffect(() => {
      const onScroll = () => {
        if (!windowElement) {
          return
        }
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
        className={className}
      />
    )
  }
)

ScrollToTopButton.displayName = 'ScrollToTop'
