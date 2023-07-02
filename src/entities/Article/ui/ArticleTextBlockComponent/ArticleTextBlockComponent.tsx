import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/Stack'
import type { TestProps } from '@/shared/types/tests'
import type { ArticleTextBlock } from '../../model/types/article'
import styles from './ArticleTextBlockComponent.module.scss'

interface ArticleTextBlockComponentProps extends TestProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({
    className,
    block,
    'data-testid': dataTestId,
  }: ArticleTextBlockComponentProps) => {
    return (
      <VStack
        gap={0.5}
        className={classNames(styles.articleTextBlockComponent, {}, [
          className,
        ])}
        as='section'
      >
        {block.title && (
          <Text
            className={styles.title}
            title={block.title}
            data-testid={dataTestId}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            className={styles.paragraph}
            text={paragraph}
            data-testid={dataTestId}
          />
        ))}
      </VStack>
    )
  }
)

ArticleTextBlockComponent.displayName = 'ArticleTextBlockComponent'
