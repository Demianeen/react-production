import { rtkApi } from '@/shared/api/rtkApi'
import type { JsonSettings } from '../types/jsonSettings'
import type { User } from '../types/userSchema'

interface SetJsonSettingsArgs {
  userId: number
  jsonSettings: JsonSettings
}

const userApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    setJsonSettings: builder.mutation<User, SetJsonSettingsArgs>({
      query: ({ userId, jsonSettings }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: {
          jsonSettings,
        },
      }),
    }),
    getUserAuthDataById: builder.query<User, number>({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
    }),
  }),
})

export const setJsonSettingsMutation =
  userApi.endpoints.setJsonSettings.initiate

export const getUserAuthDataByIdQuery =
  userApi.endpoints.getUserAuthDataById.initiate
