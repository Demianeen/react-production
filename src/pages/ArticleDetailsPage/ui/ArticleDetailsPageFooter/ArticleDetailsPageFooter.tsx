import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/deprecated/Text'
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList'
import { ArticleCommentList } from '@/features/ArticleCommentList'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleRating } from '@/features/ArticleRating'
import { ToggleFeature } from '@/shared/lib/features'
import { Title } from '@/shared/ui/redesigned/Title'
import styles from './ArticleDetailsPageFooter.module.scss'

interface ArticleDetailsPageFooterProps {
  className?: string
  articleId: number
}

export const ArticleDetailsPageFooter = memo(
  ({ className, articleId }: ArticleDetailsPageFooterProps) => {
    const { t } = useTranslation('article-details')

    return (
      <VStack
        gap={1.25}
        className={classNames(styles.articleDetailsPageFooter, {}, [
          className,
        ])}
        maxWidth
      >
        <ToggleFeature
          name='isArticleRatingEnabled'
          on={<ArticleRating articleId={articleId} />}
          off={null}
        />
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Title level={1} tag='h2'>
              {t('Recommend next')}
            </Title>
          }
          off={<Text title={t('Recommend next')} />}
        />
        <ArticleRecommendationsList />
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Title level={1} tag='h2'>
              {t('Comments')}
            </Title>
          }
          off={<Text title={t('Comments')} />}
        />
        <ArticleCommentList articleId={Number(articleId)} />
      </VStack>
    )
  }
)

ArticleDetailsPageFooter.displayName = 'ArticleDetailsPageFooter'
