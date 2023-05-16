import React, { memo } from 'react'
import { Text } from 'shared/ui/Text/Text'
import { ArticleRecommendationsList } from 'features/ArticleRecommendationsList'
import { ArticleCommentList } from 'features/ArticleCommentList'
import { VStack } from 'shared/ui/Stack'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './ArticleDetailsPageFooter.module.scss'

interface ArticleDetailsPageFooterProps {
  className?: string
  id: number
}

export const ArticleDetailsPageFooter = memo(
  ({ className, id }: ArticleDetailsPageFooterProps) => {
    const { t } = useTranslation('article-details')

    return (
      <VStack
        gap={1.25}
        className={classNames(
          styles.articleDetailsPageFooter,
          {},
          [className]
        )}
        maxWidth
      >
        <Text title={t('Recommend next')} />
        <ArticleRecommendationsList />
        <Text title={t('Comments')} />
        <ArticleCommentList articleId={Number(id)} />
      </VStack>
    )
  }
)

ArticleDetailsPageFooter.displayName =
  'ArticleDetailsPageFooter'
