import React from 'react'
import { Skeleton } from '../../deprecated/Skeleton'

interface ButtonSkeletonProps {
  className?: string
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const ButtonSkeleton = ({
  className,
}: ButtonSkeletonProps) => {
  return (
    // FIXME: Add redesigned skeleton
    <Skeleton
      height='calc(var(--font-line-m) + 1rem)'
      width='5rem'
      className={className}
    />
  )
}
