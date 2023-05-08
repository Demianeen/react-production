import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import { HStack } from 'shared/ui/Stack'
import styles from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = memo(
  ({ className }: PageLoaderProps) => {
    return (
      <HStack
        className={classNames(styles.pageLoader, {}, [
          className,
        ])}
        justify='center'
        align='center'
        maxWidth
      >
        <Spinner />
      </HStack>
    )
  }
)

PageLoader.displayName = 'PageLoader'
