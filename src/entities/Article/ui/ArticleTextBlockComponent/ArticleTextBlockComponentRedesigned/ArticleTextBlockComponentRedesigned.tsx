import { memo } from 'react'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { TestProps } from '@/shared/types/tests'
import { Title } from '@/shared/ui/redesigned/Title'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
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
        className={classNamesNew(
          styles.articleTextBlockComponent,
          className
        )}
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
