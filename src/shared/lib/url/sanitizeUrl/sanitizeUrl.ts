const SUPPORTED_URL_PROTOCOLS = new Set([
  'http:',
  'https:',
  'mailto:',
  'sms:',
  'tel:',
])

/**
 * HTML sanitization is an OWASP-recommended strategy to prevent XSS vulnerabilities in web applications
 */
export const sanitizeUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url)
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'about:blank'
    }
  } catch {
    return url
  }
  return url
}
