import type { ReactNode } from 'react'
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { StateSchema } from '@/app/providers/StoreProvider'
import type { TestProps } from '@/shared/types/tests'
import { toggleFeature } from '@/shared/lib/features'
import { AppRoutes } from '@/shared/const/router/appRoutes'
import { useCurrentRoutePath } from '@/shared/lib/router/useCurrentRoutePath'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import { pageActions } from '../../model/slice/pageSlice'
import { getPageScrollPositionByPath } from '../../selectors/getPageScrollPositionByPath/getPageScrollPositionByPath'
import styles from './Page.module.scss'

interface PageProps extends TestProps {
  className?: string
  children?: ReactNode
}

const skipScrollPositions: OptionalRecord<AppRoutes, unknown> = {
  [AppRoutes.ARTICLES]: AppRoutes.ARTICLES,
  [AppRoutes.NOT_FOUND]: AppRoutes.NOT_FOUND,
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  (
    { className, children, 'data-testid': dataTestId },
    forwardedRef
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const currentPath = useCurrentRoutePath()

    const { pathname } = useLocation()

    const dispatch = useAppDispatch()
    const scrollPosition = useSelector((state: StateSchema) =>
      getPageScrollPositionByPath(state, pathname)
    )

    useImperativeHandle(
      forwardedRef,
      () => wrapperRef.current as HTMLDivElement
    )

    const onScroll = useThrottle(() => {
      if (skipScrollPositions[currentPath]) {
        return
      }

      dispatch(
        pageActions.setScrollPosition({
          path: pathname,
          position: toggleFeature({
            name: 'isAppRedesigned',
            on: () => window.scrollY,
            off: () => wrapperRef.current?.scrollTop ?? 0,
          }),
        })
      )
    }, 300)

    useEffect(() => {
      toggleFeature({
        name: 'isAppRedesigned',
        on: () => {
          if (!skipScrollPositions[currentPath]) {
            window.scroll(0, scrollPosition)
          }
        },
        off: () => {
          if (wrapperRef.current !== null) {
            wrapperRef.current.scrollTop = scrollPosition
          }
        },
      })
      // we need that it scroll only once on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      toggleFeature({
        name: 'isAppRedesigned',
        on: () => {
          window.addEventListener('scroll', onScroll)
        },
        off: () => {},
      })
      return () => {
        toggleFeature({
          name: 'isAppRedesigned',
          on: () => window.removeEventListener('scroll', onScroll),
          off: () => {},
        })
      }
    }, [onScroll])

    return (
      <main
        ref={wrapperRef}
        className={classNames(
          toggleFeature({
            name: 'isAppRedesigned',
            on: () => styles.pageRedesigned,
            off: () => styles.page,
          }),
          {},
          [className]
        )}
        onScroll={onScroll}
        data-testid={dataTestId}
      >
        {children}
      </main>
    )
  }
)

Page.displayName = 'Page'
