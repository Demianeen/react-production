import type { ReactNode, UIEvent } from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { StateSchema } from '@/app/providers/StoreProvider'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { pageActions } from '../../model/slice/pageSlice'
import { getPageScrollPositionByPath } from '../../selectors/getPageScrollPositionByPath/getPageScrollPositionByPath'
import styles from './Page.module.scss'

interface PageProps {
  className?: string
  children?: ReactNode
}

// FIXME: Scroll position is not restored
export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ className, children }, forwardedRef) => {
    const wrapperRef = useRef<HTMLElement | null>(null)

    const { pathname } = useLocation()

    const dispatch = useAppDispatch()
    const scrollPosition = useSelector(
      (state: StateSchema) =>
        getPageScrollPositionByPath(state, pathname)
    )

    const mergedRef = (ref: HTMLDivElement | null) => {
      if (
        typeof forwardedRef !== 'function' &&
        forwardedRef !== null
      ) {
        // eslint-disable-next-line no-param-reassign
        forwardedRef.current = ref
      }
      wrapperRef.current = ref
    }

    useEffect(() => {
      if (wrapperRef.current !== null) {
        wrapperRef.current.scrollTop = scrollPosition
      }
    }, [scrollPosition])

    const onScroll = useThrottle(
      (e: UIEvent<HTMLElement>) => {
        dispatch(
          pageActions.setScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop,
          })
        )
      },
      500
    )

    return (
      <main
        ref={mergedRef}
        className={classNames(styles.page, {}, [className])}
        onScroll={onScroll}
      >
        {children}
      </main>
    )
  }
)

Page.displayName = 'Page'
