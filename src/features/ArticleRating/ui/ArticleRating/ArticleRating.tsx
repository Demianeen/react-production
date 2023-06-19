import React, { memo, useCallback } from 'react'
import { RatingCard, RatingCardSkeleton } from '@/entities/Rating'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'
import {
  useGetArticleRatingQuery,
  useRateArticleMutation,
} from '../../api/articleRatingApi'

export interface ArticleRatingProps {
  className?: string
  articleId: number
}

const ArticleRating = memo(
  ({ className, articleId }: ArticleRatingProps) => {
    const { t } = useTranslation('article-details')

    const userId = useSelector(getUserId)
    const {
      data,
      isLoading: isGetRatingLoading,
      isError,
      isUninitialized,
    } = useGetArticleRatingQuery(
      {
        articleId,
        // we skip request if userId is undefined
        userId: userId as number,
      },
      {
        skip: userId === undefined,
      }
    )

    const [rateArticle, { isLoading: isRateArticleLoading }] =
      useRateArticleMutation()

    const handleRateArticle = useCallback(
      (starCount: number, feedback?: string) => {
        if (userId === undefined) return
        if (isRateArticleLoading) return

        rateArticle({
          articleId,
          userId,
          rating: starCount,
          feedback,
        })
      },
      [articleId, isRateArticleLoading, rateArticle, userId]
    )

    const onCancel = useCallback(
      (starCount: number) => {
        handleRateArticle(starCount)
      },
      [handleRateArticle]
    )

    const onSubmit = useCallback(
      (starCount: number, feedback?: string) => {
        handleRateArticle(starCount, feedback)
      },
      [handleRateArticle]
    )

    if (isGetRatingLoading) {
      return (
        <RatingCardSkeleton squared maxWidth className={className} />
      )
    }

    if (isError || isUninitialized) {
      return (
        <Card squared>
          <Text
            text={t(
              'Article rating is unavailable right now. Try again later'
            )}
          />
        </Card>
      )
    }

    const rating = data?.[0]?.rating ?? 0

    return (
      <RatingCard
        onCancel={onCancel}
        onSubmit={onSubmit}
        rating={rating}
        title={t('Evaluate the article')}
        feedbackTitle={t(
          'Leave a feedback about the article. It can be a comment, a question or a suggestion for improvement.'
        )}
        squared
        className={className}
        maxWidth
      />
    )
  }
)

ArticleRating.displayName = 'ArticleRating'

export default ArticleRating
