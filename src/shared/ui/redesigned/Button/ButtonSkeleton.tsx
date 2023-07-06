import React from 'react'
import { Skeleton } from '../Skeleton'

interface ButtonSkeletonProps {
  className?: string
}

export const ButtonSkeleton = ({
  className,
}: ButtonSkeletonProps) => {
  return (
    <Skeleton
      height='calc(var(--font-line-m) + 1rem)'
      width='5rem'
      className={className}
    />
  )
}
