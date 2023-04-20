import React, { memo } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { ArticleCommentList } from 'features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList'
import styles from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({
  className,
}: ArticleDetailsPageProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')

  if (id === undefined) {
    return (
      <div>
        <Text
          className={styles.commentTitle}
          title={t('Article not found')}
        />
      </div>
    )
  }

  return (
    <article>
      <ArticleDetails id={Number(id)} />
      <Text title={t('Comments')} />
      <ArticleCommentList articleId={Number(id)} />
    </article>
  )
}

export default memo(ArticleDetailsPage)
