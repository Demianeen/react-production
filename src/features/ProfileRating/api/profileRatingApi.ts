import { rtkApi } from '@/shared/api/rtkApi'
import type { ProfileRating } from '../model/types/profileRating'

interface GetArticleRatingParams {
  userId: number
  profileId: number
}

interface RateArticleParams {
  userId: number
  profileId: number
  rating: number
  feedback?: string
}

const profileRatingApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfileRating: builder.query<
      ProfileRating[] | undefined,
      GetArticleRatingParams
    >({
      query: (params) => ({
        url: '/profile-rating',
        params,
      }),
    }),
    rateProfile: builder.mutation<ProfileRating, RateArticleParams>({
      query: (body) => ({
        url: '/profile-rating',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetProfileRatingQuery, useRateProfileMutation } =
  profileRatingApi
