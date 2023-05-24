// This function is divided for testing
export const getNewQueryParamsString = (
  params: OptionalRecord<string, string>
) => {
  const searchParams = new URLSearchParams(
    window.location.search
  )
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
  })
  return `?${searchParams.toString()}`
}

/**
 * Add query params to the current URL
 * @param params
 */
export const addQueryParams = (
  params: OptionalRecord<string, string>
) => {
  window.history.pushState(
    null,
    '',
    getNewQueryParamsString(params)
  )
}
