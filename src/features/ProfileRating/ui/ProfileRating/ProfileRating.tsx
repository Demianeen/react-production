import React, { memo, useCallback } from 'react'
import { RatingCard, RatingCardSkeleton } from '@/entities/Rating'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card'
import { ToggleFeature } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack } from '@/shared/ui/redesigned/Stack'
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

    const [rateProfile, { isLoading: isRateArticleLoading }] =
      useRateProfileMutation()

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
        <ToggleFeature
          name='isAppRedesigned'
          on={<RatingCardSkeleton className={className} />}
          off={
            <RatingCardSkeleton
              maxWidth
              squared
              className={className}
            />
          }
        />
      )
    }

    if (isError || isUninitialized) {
      return (
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <HStack as={Card} maxWidth justify='center'>
              <p>
                {t(
                  'Profile rating is unavailable right now. Try again later'
                )}
              </p>
            </HStack>
          }
          off={
            <CardDeprecated squared>
              <TextDeprecated
                text={t(
                  'Profile rating is unavailable right now. Try again later'
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
      title: t('Evaluate the profile'),
      feedbackTitle: t('What do you like about this profile?'),
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

ProfileRating.displayName = 'ProfileRating'

export default ProfileRating
