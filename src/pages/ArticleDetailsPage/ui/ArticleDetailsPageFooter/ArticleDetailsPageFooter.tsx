import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text'
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList'
import { ArticleCommentList } from '@/features/ArticleCommentList'
import { VStack } from '@/shared/ui/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleRating } from '@/features/ArticleRating'
import styles from './ArticleDetailsPageFooter.module.scss'

interface ArticleDetailsPageFooterProps {
  className?: string
  articleId: number
}

export const ArticleDetailsPageFooter = memo(
  ({
    className,
    articleId,
  }: ArticleDetailsPageFooterProps) => {
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
        <ArticleRating articleId={articleId} />
        <Text title={t('Recommend next')} />
        <ArticleRecommendationsList />
        <Text title={t('Comments')} />
        <ArticleCommentList articleId={Number(articleId)} />
      </VStack>
    )
  }
)

ArticleDetailsPageFooter.displayName =
  'ArticleDetailsPageFooter'
