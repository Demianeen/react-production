import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { toggleFeature } from '@/shared/lib/features'
import styles from './ArticleThumbnail.module.scss'

export interface ArticleThumbnailProps {
  className?: string
  src: string
  alt?: string
}

export const ArticleThumbnail = typedMemo(
  ({ className, src, alt }: ArticleThumbnailProps) => {
    const SkeletonComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Skeleton,
      off: () => SkeletonDeprecated,
    })

    return (
      <AppImage
        src={src}
        alt={alt ?? 'article thumbnail'}
        className={classNamesNew(styles.articleThumbnail, className)}
        fallback={<SkeletonComponent height='15rem' />}
      />
    )
  }
)
