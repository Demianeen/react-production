import { memo } from 'react'
import { Spinner as SpinnerDeprecated } from '@/shared/ui/deprecated/Spinner'
import { Spinner } from '@/shared/ui/redesigned/Spinner'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeature } from '@/shared/lib/features'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './PageLoader.module.scss'

interface PageLoaderProps {
  className?: string
}

export const PageLoader = memo(({ className }: PageLoaderProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <HStack
          className={classNamesNew(styles.pageLoader, className)}
          justify='center'
          align='center'
          maxWidth
          maxHeight
        >
          <Spinner />
        </HStack>
      }
      off={
        <HStack
          className={classNamesNew(
            styles.pageLoaderDeprecated,
            className
          )}
          justify='center'
          align='center'
          maxWidth
        >
          <SpinnerDeprecated />
        </HStack>
      }
    />
  )
})

PageLoader.displayName = 'PageLoader'
