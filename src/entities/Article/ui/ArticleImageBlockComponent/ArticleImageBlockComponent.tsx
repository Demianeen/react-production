import { memo } from 'react'
import { Text, TextAlign } from '@/shared/ui/deprecated/Text'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import type { TestProps } from '@/shared/types/tests'
import { ToggleFeature } from '@/shared/lib/features'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton'
import type { ArticleImageBlock } from '../../model/types/article'
import styles from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps extends TestProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  ({
    className,
    block,
    'data-testid': dataTestId,
  }: ArticleImageBlockComponentProps) => {
    return (
      <VStack
        className={className}
        justify='center'
        align='center'
        maxWidth
      >
        <AppImage
          className={styles.img}
          src={block.src}
          alt={block.title ?? ''}
          data-testid={`${dataTestId}.Image`}
          fallback={
            <ToggleFeature
              name='isAppRedesigned'
              on={<Skeleton height='10rem' />}
              off={<SkeletonDeprecated height='10rem' />}
            />
          }
        />
        {block.title && (
          <ToggleFeature
            name='isAppRedesigned'
            on={
              <HStack as='p' maxWidth justify='center'>
                {block.title}
              </HStack>
            }
            off={
              <Text
                text={block.title}
                align={TextAlign.CENTER}
                data-testid={`${dataTestId}.Title`}
              />
            }
          />
        )}
      </VStack>
    )
  }
)

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent'
