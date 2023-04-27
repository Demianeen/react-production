import React, { memo } from 'react'
import { ArticleDetails } from 'entities/Article'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { ArticleCommentList } from 'features/ArticleCommentList/ui/ArticleCommentList/ArticleCommentList'
import { Page } from 'shared/ui/Page/Page'
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
      <Page>
        <Text
          className={styles.commentTitle}
          title={t('Article not found')}
        />
      </Page>
    )
  }

  return (
    <Page className={className}>
      <ArticleDetails id={Number(id)} />
      <Text
        title={t('Comments')}
        className={styles.commentTitle}
      />
      <ArticleCommentList articleId={Number(id)} />
    </Page>
  )
}

export default memo(ArticleDetailsPage)
