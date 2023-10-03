import { sanitizeHtmlString } from './sanitizeHtmlString'

export const getSanitizedDomFromString = async (
  htmlString: string,
) => {
  const cleanDomString = await sanitizeHtmlString(htmlString)

  // Parse the DOM
  const parser = new DOMParser()
  const cleanDom = parser.parseFromString(cleanDomString, 'text/html')

  return cleanDom
}
