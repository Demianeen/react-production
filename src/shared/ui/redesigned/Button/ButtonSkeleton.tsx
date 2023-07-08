import React from 'react'
import { Skeleton } from '../Skeleton'

interface ButtonSkeletonProps {
  className?: string
  width?: string
}

export const ButtonSkeleton = ({
  className,
  width = '5rem',
}: ButtonSkeletonProps) => {
  return (
    <Skeleton
      height='calc(var(--font-line-m) + 1rem)'
      width={width}
      className={className}
    />
  )
}
