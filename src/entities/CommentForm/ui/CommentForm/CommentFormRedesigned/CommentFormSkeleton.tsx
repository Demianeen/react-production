import { memo } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { InputSkeleton } from '@/shared/ui/redesigned/Input'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

export interface CommentFormSkeletonProps {
  className?: string
}

export const CommentFormRedesignedSkeleton = ({
  className,
}: CommentFormSkeletonProps) => {
  return (
    <HStack className={className} align='center' gap={1} maxWidth>
      <InputSkeleton maxWidth withoutLabel />
      <Skeleton width='2.5rem' height='2.5rem' />
    </HStack>
  )
}

export default memo(CommentFormRedesignedSkeleton)
