import type { ReactNode, UIEvent } from 'react'
import React, { useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { pageActions } from 'widgets/Page/model/slice/pageSlice'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getPageScrollPositionByPath } from 'widgets/Page/selectors/getPageScrollPositionByPath/getPageScrollPositionByPath'
import type { StateSchema } from 'app/providers/StoreProvider'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'
import styles from './Page.module.scss'

interface PageProps {
  className?: string
  children?: ReactNode
  onScrollEnd?: () => void
}

export const Page = ({
  className,
  children,
  onScrollEnd,
}: PageProps) => {
  const wrapperRef = useRef<HTMLElement | null>(null)
  const triggerRef = useRef<HTMLDivElement | null>(null)

  useInfiniteScroll({
    wrapperRef,
    triggerRef,
    callback: onScrollEnd,
  })

  const { pathname } = useLocation()

  const dispatch = useAppDispatch()
  const scrollPosition = useSelector((state: StateSchema) =>
    getPageScrollPositionByPath(state, pathname)
  )

  useInitialEffect(() => {
    if (wrapperRef.current !== null) {
      wrapperRef.current.scrollTop = scrollPosition
    }
  })

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
    <section
      ref={wrapperRef}
      className={classNames(styles.page, {}, [className])}
      onScroll={onScroll}
    >
      {children}
      {onScrollEnd && <div ref={triggerRef} />}
    </section>
  )
}
