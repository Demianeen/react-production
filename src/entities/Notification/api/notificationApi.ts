import { rtkApi } from '@/shared/api/rtkApi'
import type { Notification } from '../model/types/notification'

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], number>(
      {
        query: (userId) => ({
          url: '/notifications',
          params: {
            userId,
          },
        }),
      }
    ),
  }),
})

export const { useGetNotificationsQuery } = notificationApi
