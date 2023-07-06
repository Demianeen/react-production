import { type User } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'
import type { FeatureFlags } from '@/shared/types/featureFlags'
import type { EntityId } from '@reduxjs/toolkit'
import { getAllFeatureFlags } from '../lib/setGetFeatures'

interface UpdateFeatureFlagsArgs {
  userId: EntityId
  featureFlags: Partial<FeatureFlags>
}

const userApi = rtkApi.injectEndpoints({
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
        window.location.reload()

        return response
      },
    }),
  }),
})

export const updateFeatureFlagsMutation =
  userApi.endpoints.updateFeatureFlags.initiate

export const { useUpdateFeatureFlagsMutation } = userApi
