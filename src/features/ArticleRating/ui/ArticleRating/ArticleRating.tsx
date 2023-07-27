import React, { memo, useCallback } from 'react'
import { RatingCard, RatingCardSkeleton } from '@/entities/Rating'
import { useTranslation } from 'react-i18next'
import { useUserId } from '@/entities/User'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { ToggleFeature } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'
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

    const userId = useUserId()
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

    if (isGetRatingLoading || isUninitialized) {
      return (
        <RatingCardSkeleton squared maxWidth className={className} />
      )
    }

    if (isError) {
      return (
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <HStack maxWidth justify='center'>
              <p>
                {t(
                  'Article rating is unavailable right now. Try again later'
                )}
              </p>
            </HStack>
          }
          off={
            <CardDeprecated squared>
              <TextDeprecated
                text={t(
                  'Article rating is unavailable right now. Try again later'
                )}
              />
            </CardDeprecated>
          }
        />
      )
    }

    const rating = data?.[0]?.rating ?? 0

    const defaultProps = {
      onCancel,
      onSubmit,
      rating,
      title: t('Evaluate the article'),
      feedbackTitle: t(
        'Leave a feedback about the article. It can be a comment, a question or a suggestion for improvement.'
      ),
      className,
    }

    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={<RatingCard {...defaultProps} />}
        off={<RatingCard {...defaultProps} maxWidth squared />}
      />
    )
  }
)

ArticleRating.displayName = 'ArticleRating'

export default ArticleRating
