import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleList } from '@/entities/Article'
import { View } from '@/entities/View'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { useGetArticleRecommendationsQuery } from '../../api/articleRecommendationsApi'
import styles from './ArticleRecommendationsList.module.scss'

interface ArticleRecommendationsListProps {
  className?: string
}

export const ArticleRecommendationsList = ({
  className,
}: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('article-details')
  const {
    data: recommendations = [],
    isLoading,
    isError,
  } = useGetArticleRecommendationsQuery(4)

  if (isError) {
    return (
      <Text
        size={TextSize.M}
        text={t('Failed to load articles recommendations')}
      />
    )
  }

  return (
    <ArticleList
      articles={recommendations}
      isLoading={isLoading}
      className={classNames(styles.recommendations, {}, [className])}
      target='_blank'
      view={View.GRID}
      data-testid='ArticleRecommendationsList'
      gridItemWidth={240}
    />
  )
}
