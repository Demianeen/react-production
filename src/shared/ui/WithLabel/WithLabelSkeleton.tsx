import type { ReactNode } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '../Skeleton/Skeleton'
import { VStack } from '../Stack'
import styles from './WithLabel.module.scss'

interface WithLabelSkeletonProps {
  className?: string
  children: ReactNode
  wrapperClassName?: string
  maxWidth?: boolean
}

export const WithLabelSkeleton = memo(
  ({
    className,
    wrapperClassName,
    children,
    maxWidth,
  }: WithLabelSkeletonProps) => {
    return (
      <VStack
        className={wrapperClassName}
        maxWidth={maxWidth}
      >
        <Skeleton
          height='var(--font-line-m)'
          width='6rem'
          className={classNames(styles.label, {}, [
            className,
          ])}
        />
        {children}
      </VStack>
    )
  }
)

WithLabelSkeleton.displayName = 'WithLabel'
