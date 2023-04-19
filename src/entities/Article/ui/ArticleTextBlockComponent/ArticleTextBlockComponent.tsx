import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import type { ArticleTextBlock } from '../../model/types/article'
import styles from './ArticleTextBlockComponent.module.scss'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({
    className,
    block,
  }: ArticleTextBlockComponentProps) => {
    return (
      <section
        className={classNames(
          styles.articleTextBlockComponent,
          {},
          [className]
        )}
      >
        {block.title && (
          <Text
            className={styles.title}
            title={block.title}
          />
        )}
        {block.paragraphs.map((paragraph) => (
          <Text
            key={paragraph}
            className={styles.paragraph}
            text={paragraph}
          />
        ))}
      </section>
    )
  }
)

ArticleTextBlockComponent.displayName =
  'ArticleTextBlockComponent'
