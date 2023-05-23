import { rtkApi } from 'shared/api/rtkApi'
import type { Notification } from '../model/types/notification'

const notificationApiApi = rtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], null>({
      query: () => ({
        url: '/notifications',
      }),
    }),
  }),
})

export const { useGetNotificationsQuery } =
  notificationApiApi
