/**
 * Returns URLSearchParams object from the current URL
 * @returns {URLSearchParams}
 */
export const getQueryParams = () => {
  return new URLSearchParams(window.location.search)
}
