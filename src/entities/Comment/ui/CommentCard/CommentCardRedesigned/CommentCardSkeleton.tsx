import { memo } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface CommentCardProps {
  className?: string
}

export const CommentCardRedesignedSkeleton = memo(
  ({ className }: CommentCardProps) => {
    return (
      <HStack className={className} gap={1} align='start' maxWidth>
        <Skeleton variant='circular' size='2rem' />
        <Skeleton height='4rem' />
      </HStack>
    )
  }
)

CommentCardRedesignedSkeleton.displayName = 'CommentCardIsLoading'
