import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/Code'
import type { ArticleCodeBlock } from '../../model/types/article'
import styles from './ArticleCodeBlockComponent.module.scss'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  ({
    className,
    block,
  }: ArticleCodeBlockComponentProps) => {
    return (
      <div
        className={classNames(
          styles.articleCodeBlockComponent,
          {},
          [className]
        )}
      >
        <Code text={block.code} />
      </div>
    )
  }
)

ArticleCodeBlockComponent.displayName =
  'ArticleCodeBlockComponent'
