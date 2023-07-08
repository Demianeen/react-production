import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { memo } from 'react'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { AvatarSkeleton } from '@/shared/ui/redesigned/Avatar/AvatarSkeleton'
import styles from './ArticleAdditionalInfo.module.scss'

interface ArticleAdditionalInfoSkeletonProps {
  className?: string
}

export const ArticleAdditionalInfoSkeleton = memo(
  ({ className }: ArticleAdditionalInfoSkeletonProps) => {
    return (
      <VStack
        gap={2}
        className={classNamesNew(
          styles.articleAdditionalInfo,
          className
        )}
      >
        <AvatarSkeleton user textWidth='8rem' />
        <Skeleton variant='text' width='6rem' />
      </VStack>
    )
  }
)

ArticleAdditionalInfoSkeleton.displayName =
  'ArticleAdditionalInfoSkeleton'
