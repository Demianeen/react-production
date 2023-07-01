import type { ReactNode, UIEvent } from 'react'
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
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'
import type { TestProps } from '@/shared/types/tests'
import { toggleFeature } from '@/shared/lib/features'
import { pageActions } from '../../model/slice/pageSlice'
import { getPageScrollPositionByPath } from '../../selectors/getPageScrollPositionByPath/getPageScrollPositionByPath'
import styles from './Page.module.scss'

interface PageProps extends TestProps {
  className?: string
  children?: ReactNode
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  (
    { className, children, 'data-testid': dataTestId },
    forwardedRef
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const { pathname } = useLocation()

    const dispatch = useAppDispatch()
    const scrollPosition = useSelector((state: StateSchema) =>
      getPageScrollPositionByPath(state, pathname)
    )

    useImperativeHandle(
      forwardedRef,
      () => wrapperRef.current as HTMLDivElement
    )

    useEffect(() => {
      if (wrapperRef.current !== null) {
        wrapperRef.current.scrollTop = scrollPosition
      }
    }, [scrollPosition])

    const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
      dispatch(
        pageActions.setScrollPosition({
          path: pathname,
          position: e.currentTarget.scrollTop,
        })
      )
    }, 500)

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
