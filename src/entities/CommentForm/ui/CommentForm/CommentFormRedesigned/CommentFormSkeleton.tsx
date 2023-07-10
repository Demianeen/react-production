import { memo } from 'react'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { InputSkeleton } from '@/shared/ui/redesigned/Input'
import { ButtonSkeleton } from '@/shared/ui/redesigned/Button'

export interface CommentFormSkeletonProps {
  className?: string
}

export const CommentFormRedesignedSkeleton = ({
  className,
}: CommentFormSkeletonProps) => {
  return (
    <HStack className={className} align='end' gap={1} maxWidth>
      <InputSkeleton maxWidth />
      <ButtonSkeleton />
    </HStack>
  )
}

export default memo(CommentFormRedesignedSkeleton)
