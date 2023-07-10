import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { TestProps } from '@/shared/types/tests'
import type { ArticleTextBlock } from '../../../model/types/article'
import styles from './ArticleTextBlockComponentDeprecated.module.scss'

interface ArticleTextBlockComponentDeprecatedProps extends TestProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponentDeprecated = memo(
  ({
    className,
    block,
    'data-testid': dataTestId,
  }: ArticleTextBlockComponentDeprecatedProps) => {
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

ArticleTextBlockComponentDeprecated.displayName =
  'ArticleTextBlockComponent'