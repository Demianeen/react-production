import axios from 'axios'
import { USER_ID_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

export const $api = axios.create({
  baseURL: __API__,
})

// set authorization header on each request
$api.interceptors.request.use((config) => {
  if (config.headers) {
    const token = localStorage.getItem(USER_ID_LOCALSTORAGE_KEY)
    if (token === null) return config
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token
  }
  return config
})
