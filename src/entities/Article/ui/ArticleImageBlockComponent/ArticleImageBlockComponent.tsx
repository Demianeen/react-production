import { memo } from 'react'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'
import type { ArticleImageBlock } from '../../model/types/article'
import styles from './ArticleImageBlockComponent.module.scss'

interface ArticleImageBlockComponentProps {
  className?: string
  block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
  ({
    className,
    block,
  }: ArticleImageBlockComponentProps) => {
    return (
      <VStack
        className={className}
        justify='center'
        align='stretch'
      >
        <img
          className={styles.img}
          src={block.src}
          alt={block.title}
        />
        {block.title && (
          <Text
            text={block.title}
            align={TextAlign.CENTER}
          />
        )}
      </VStack>
    )
  }
)

ArticleImageBlockComponent.displayName =
  'ArticleImageBlockComponent'
