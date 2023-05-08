import { getQueryParams } from '../getQueryParams/getQueryParams'

type InitQueryParams<T extends Record<string, string>> = {
  [K in keyof T]: (param: T[K]) => void
}

export const initQueryParams = <
  T extends Record<string, string>
>(
  queryParams: InitQueryParams<T>
) => {
  const searchParams = getQueryParams()

  Object.entries(queryParams).forEach(
    ([param, callback]) => {
      const paramValue = searchParams.get(param)
      if (paramValue) {
        callback(paramValue as T[keyof T])
      }
    }
  )
}
