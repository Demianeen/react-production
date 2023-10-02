/**
 * Returns URLSearchParams object from the current URL
 * @returns {URLSearchParams}
 */
export const getQueryParams = () =>
  new URLSearchParams(window.location.search)
