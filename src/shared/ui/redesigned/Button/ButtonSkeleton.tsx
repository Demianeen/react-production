import React from 'react'
import type { SkeletonBackgroundColor } from '../Skeleton'
import { Skeleton } from '../Skeleton'

interface ButtonSkeletonProps {
  className?: string
  width?: string
  backgroundColor?: SkeletonBackgroundColor
}

export const ButtonSkeleton = ({
  className,
  width = '5rem',
  backgroundColor,
}: ButtonSkeletonProps) => {
  return (
    <Skeleton
      height='calc(var(--font-line-m) + 1rem)'
      width={width}
      className={className}
      backgroundColor={backgroundColor}
    />
  )
}
