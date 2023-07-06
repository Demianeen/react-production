import type { ReactNode } from 'react'
import { memo } from 'react'
import { Skeleton } from '../Skeleton/Skeleton'
import { VStack } from '../Stack'

interface WithLabelSkeletonProps {
  className?: string
  children: ReactNode
  /**
   * The class name for the wrapper
   */
  wrapperClassName?: string
  /**
   * Flag to set width to 100%
   */
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
        gap={0.5}
      >
        <Skeleton variant='text' width='6rem' className={className} />
        {children}
      </VStack>
    )
  }
)

WithLabelSkeleton.displayName = 'WithLabel'
