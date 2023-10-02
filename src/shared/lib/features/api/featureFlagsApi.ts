import { type User } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import type { FeatureFlags } from '@/shared/types/featureFlags'
import type { EntityId } from '@reduxjs/toolkit'
import { FEATURE_FLAGS_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { getAllFeatureFlags } from '../lib/setGetFeatures'

interface UpdateFeatureFlagsArgs {
  userId: EntityId
  featureFlags: FeatureFlags
}

const featureFlagsApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    updateFeatureFlags: builder.mutation<
      User,
      UpdateFeatureFlagsArgs
    >({
      query: ({ userId, featureFlags: features }) => {
        const oldFeatureFlags = getAllFeatureFlags()

        return {
          url: `/users/${userId}`,
          method: 'PATCH',
          body: {
            features: {
              ...oldFeatureFlags,
              ...features,
            },
          },
        }
      },
      transformResponse: (response: User) => {
        localStorage.setItem(
          FEATURE_FLAGS_LOCALSTORAGE_KEY,
          JSON.stringify(response.features)
        )

        window.location.reload()

        return response
      },
    }),
  }),
})

export const updateFeatureFlagsMutation =
  featureFlagsApi.endpoints.updateFeatureFlags.initiate

export const { useUpdateFeatureFlagsMutation } = featureFlagsApi
