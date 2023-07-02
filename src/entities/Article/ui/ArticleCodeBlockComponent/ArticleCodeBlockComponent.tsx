import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/deprecated/Code'
import type { TestProps } from '@/shared/types/tests'
import type { ArticleCodeBlock } from '../../model/types/article'
import styles from './ArticleCodeBlockComponent.module.scss'

interface ArticleCodeBlockComponentProps extends TestProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  ({
    className,
    block,
    'data-testid': dataTestId,
  }: ArticleCodeBlockComponentProps) => {
    return (
      <div
        className={classNames(styles.articleCodeBlockComponent, {}, [
          className,
        ])}
      >
        <Code text={block.code} data-testid={dataTestId} />
      </div>
    )
  }
)

ArticleCodeBlockComponent.displayName = 'ArticleCodeBlockComponent'
