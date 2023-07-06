import { memo } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { WithLabelSkeleton } from '../WithLabel/WithLabelSkeleton'

interface InputSkeletonProps {
  className?: string
  wrapperClassName?: string
  maxWidth?: boolean
}

export const InputSkeleton = memo(
  ({ className, wrapperClassName, maxWidth }: InputSkeletonProps) => {
    return (
      <WithLabelSkeleton
        wrapperClassName={wrapperClassName}
        maxWidth={maxWidth}
      >
        <Skeleton className={className} height='2.5rem' />
      </WithLabelSkeleton>
    )
  }
)

InputSkeleton.displayName = 'Input'
