import React, { memo } from 'react'
import {
  ArticleDetails,
  getArticleDetailsError,
} from 'entities/Article'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { ArticleCommentList } from 'features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList'
import { useSelector } from 'react-redux'
import styles from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = ({
  className,
}: ArticleDetailsPageProps) => {
  const { id } = useParams()
  const { t } = useTranslation('article-details')
  const error = useSelector(getArticleDetailsError)
  console.log('error', error)

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
    <article className={className}>
      <ArticleDetails id={Number(id)} />
      <Text
        title={t('Comments')}
        className={styles.commentTitle}
      />
      <ArticleCommentList articleId={Number(id)} />
    </article>
  )
}

export default memo(ArticleDetailsPage)
