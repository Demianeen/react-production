import CircleArrowUpIcon from '@/shared/assets/icons/redesigned/circle-arrow-up.svg'
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

    const onScrollUp = useCallback(() => {
      window?.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, [])

    useEffect(() => {
      const onScroll = () => {
        if (window.scrollY > 0) {
          setWasScrolled(true)
        } else {
          setWasScrolled(false)
        }
      }

      window.addEventListener('scroll', onScroll)

      return () => {
        window.removeEventListener('scroll', onScroll)
      }
    }, [])

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
