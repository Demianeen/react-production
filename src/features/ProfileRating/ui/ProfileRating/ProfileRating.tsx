import React, { memo, useCallback } from 'react'
import {
  RatingCard,
  RatingCardSkeleton,
} from '@/entities/Rating'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { Text } from '@/shared/ui/Text'
import { Card } from '@/shared/ui/Card'
import {
  useGetProfileRatingQuery,
  useRateProfileMutation,
} from '../../api/profileRatingApi'

export interface ProfileRatingProps {
  className?: string
  profileId: number
}

const ProfileRating = memo(
  ({ className, profileId }: ProfileRatingProps) => {
    const { t } = useTranslation('profile')

    const userId = useSelector(getUserId)
    const {
      data,
      isLoading: isGetRatingLoading,
      isError,
      isUninitialized,
    } = useGetProfileRatingQuery(
      {
        profileId,
        // we skip request if userId is undefined
        userId: userId as number,
      },
      {
        skip: userId === undefined,
      }
    )

    const [
      rateProfile,
      { isLoading: isRateArticleLoading },
    ] = useRateProfileMutation()

    const handleRateProfile = useCallback(
      (starCount: number, feedback?: string) => {
        if (userId === undefined) return
        if (isRateArticleLoading) return

        rateProfile({
          profileId,
          userId,
          rating: starCount,
          feedback,
        })
      },
      [profileId, isRateArticleLoading, rateProfile, userId]
    )

    const onCancel = useCallback(
      (starCount: number) => {
        handleRateProfile(starCount)
      },
      [handleRateProfile]
    )

    const onSubmit = useCallback(
      (starCount: number, feedback?: string) => {
        handleRateProfile(starCount, feedback)
      },
      [handleRateProfile]
    )

    if (isGetRatingLoading) {
      return (
        <RatingCardSkeleton
          squared
          maxWidth
          className={className}
        />
      )
    }

    if (isError || isUninitialized) {
      return (
        <Card squared>
          <Text
            text={t(
              'Profile rating is unavailable right now. Try again later'
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
        title={t('Evaluate the profile')}
        feedbackTitle={t(
          'What do you like about this profile?'
        )}
        squared
        className={className}
        maxWidth
      />
    )
  }
)

ProfileRating.displayName = 'ProfileRating'

export default ProfileRating
