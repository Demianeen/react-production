import { VStack } from '@/shared/ui/redesigned/Stack'
import { InputSkeleton as InputSkeletonDeprecated } from '@/shared/ui/deprecated/Input'
import { InputSkeleton } from '@/shared/ui/redesigned/Input'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { ArticleThumbnail } from '@/entities/Article'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

export interface CreateArticleSkeletonProps {
  className?: string
}

export const CreateArticleSkeleton = ({
  className,
}: CreateArticleSkeletonProps) => {
  const inputSkeleton = (
    <ToggleFeature
      name='isAppRedesigned'
      on={<InputSkeleton maxWidth />}
      off={<InputSkeletonDeprecated maxWidth />}
    />
  )

  const SkeletonComponent = toggleFeature({
    name: 'isAppRedesigned',
    on: () => Skeleton,
    off: () => SkeletonDeprecated,
  })

  return (
    <VStack className={className} maxWidth gap={1}>
      {inputSkeleton}
      {inputSkeleton}
      {inputSkeleton}
      <ArticleThumbnail isLoading />
      <SkeletonComponent width='15rem' height='15rem' />
    </VStack>
  )
}
