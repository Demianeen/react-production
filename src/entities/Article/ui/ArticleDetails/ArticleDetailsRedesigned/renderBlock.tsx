import { ArticleBlockType } from '../../../model/const/articleBlockType'
import styles from './ArticleDetailsRedesigned.module.scss'
import type { ArticleBlock } from '../../../model/types/article'
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent'

export const renderArticleBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return (
        <ArticleCodeBlockComponent
          key={block.id}
          className={styles.block}
          block={block}
          data-testid='ArticleDetails.CodeBlock'
        />
      )
    case ArticleBlockType.IMAGE:
      return (
        <ArticleImageBlockComponent
          key={block.id}
          className={styles.block}
          block={block}
          data-testid='ArticleDetails.ImageBlock'
        />
      )
    case ArticleBlockType.TEXT:
      return (
        <ArticleTextBlockComponent
          key={block.id}
          className={styles.block}
          block={block}
          data-testid='ArticleDetails.TextBlock'
        />
      )
    default:
      return null
  }
}
