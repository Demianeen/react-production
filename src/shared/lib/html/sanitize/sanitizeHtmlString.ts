export const sanitizeHtmlString = async (htmlString: string) => {
  const DOMPurify = await import('dompurify')
  // Clean the DOM from XSS
  return DOMPurify.default.sanitize(
    htmlString,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    { USE_PROFILES: { html: true } },
  )
}
