import type { ReactNode } from 'react'
import React, { useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
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

  return (
    <section
      ref={wrapperRef}
      className={classNames(styles.page, {}, [className])}
    >
      {children}
      <div ref={triggerRef} />
    </section>
  )
}
