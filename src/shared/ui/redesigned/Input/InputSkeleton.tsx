import { memo } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { WithLabelSkeleton } from '../WithLabel/WithLabelSkeleton'

interface InputSkeletonProps {
  className?: string
  wrapperClassName?: string
  maxWidth?: boolean
  withoutLabel?: boolean
}

export const InputSkeleton = memo(
  ({
    className,
    wrapperClassName,
    maxWidth,
    withoutLabel = false,
  }: InputSkeletonProps) => {
    const inputSkeleton = (
      <Skeleton className={className} height='2.5rem' />
    )
    if (withoutLabel) {
      return inputSkeleton
    }

    return (
      <WithLabelSkeleton
        wrapperClassName={wrapperClassName}
        maxWidth={maxWidth}
      >
        {inputSkeleton}
      </WithLabelSkeleton>
    )
  }
)

InputSkeleton.displayName = 'Input'
