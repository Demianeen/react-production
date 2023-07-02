import { memo } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { WithLabelSkeleton } from '../WithLabel/WithLabelSkeleton'

interface InputSkeletonProps {
  className?: string
  wrapperClassName?: string
  maxWidth?: boolean
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const InputSkeleton = memo(
  ({ className, wrapperClassName, maxWidth }: InputSkeletonProps) => {
    return (
      <WithLabelSkeleton
        wrapperClassName={wrapperClassName}
        maxWidth={maxWidth}
      >
        <Skeleton
          height='calc(var(--font-line-m) + 1rem)'
          className={className}
        />
      </WithLabelSkeleton>
    )
  }
)

InputSkeleton.displayName = 'Input'
