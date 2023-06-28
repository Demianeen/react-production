import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { USER_ID_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_ID_LOCALSTORAGE_KEY)
      if (token !== null) {
        headers.set('Authorization', token)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})
