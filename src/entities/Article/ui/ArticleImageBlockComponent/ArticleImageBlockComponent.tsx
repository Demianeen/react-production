import { memo } from 'react'
import { Text, TextAlign } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/Stack'
import type { TestProps } from '@/shared/types/tests'
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
      <VStack className={className} justify='center' align='stretch'>
        <img
          className={styles.img}
          src={block.src}
          alt={block.title}
          data-testid={`${dataTestId}.Image`}
        />
        {block.title && (
          <Text
            text={block.title}
            align={TextAlign.CENTER}
            data-testid={`${dataTestId}.Title`}
          />
        )}
      </VStack>
    )
  }
)

ArticleImageBlockComponent.displayName = 'ArticleImageBlockComponent'
