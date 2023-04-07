import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import styles from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = memo(
  ({ className }: PageLoaderProps) => {
    return (
      <div
        className={classNames(styles.pageLoader, {}, [
          className,
        ])}
      >
        <Spinner />
      </div>
    )
  }
)

PageLoader.displayName = 'PageLoader'
