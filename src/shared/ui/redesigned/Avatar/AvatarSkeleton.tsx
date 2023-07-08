import { useMemo } from 'react'
import { HStack } from '../Stack'
import { Skeleton } from '../Skeleton'

export interface AvatarSkeletonProps {
  className?: string
  /**
   * @description Avatar skeleton width and height.
   * @default 2rem
   */
  size?: string
  /**
   * Adds a username skeleton to the avatar.
   */
  user?: boolean
  /**
   * Changes text skeleton width.
   */
  textWidth?: string
}

export const AvatarSkeleton = ({
  className,
  user,
  size = '2rem',
  textWidth = '5rem',
}: AvatarSkeletonProps) => {
  const avatar = useMemo(
    () => (
      <Skeleton
        variant='circular'
        size={size}
        className={className}
      />
    ),
    [className, size]
  )

  if (user) {
    return (
      <HStack gap={0.5} maxWidth>
        {avatar}
        <Skeleton variant='text' width={textWidth} />
      </HStack>
    )
  }

  return avatar
}
