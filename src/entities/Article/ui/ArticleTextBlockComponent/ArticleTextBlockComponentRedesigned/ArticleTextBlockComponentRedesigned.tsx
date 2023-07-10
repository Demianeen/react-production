import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { TestProps } from '@/shared/types/tests'
import { Title } from '@/shared/ui/redesigned/Title'
import type { ArticleTextBlock } from '../../../model/types/article'
import styles from './ArticleTextBlockComponentRedesigned.module.scss'

export interface ArticleTextBlockComponentRedesignedProps
  extends TestProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponentRedesigned = memo(
  ({
    className,
    block,
    'data-testid': dataTestId,
  }: ArticleTextBlockComponentRedesignedProps) => {
    return (
      <VStack
        gap={1}
        className={classNames(styles.articleTextBlockComponent, {}, [
          className,
        ])}
        as='section'
      >
        {block.title && (
          <Title data-testid={`${dataTestId}.Title`}>
            {block.title}
          </Title>
        )}
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph} data-testid={`${dataTestId}.Paragraph`}>
            {paragraph}
          </p>
        ))}
      </VStack>
    )
  }
)

ArticleTextBlockComponentRedesigned.displayName =
  'ArticleTextBlockComponent'
