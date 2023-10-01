import type { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin'
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { findUrl } from '@/shared/lib/url/findUrl/findUrl'

const MATCHERS: LinkMatcher[] = [
  (text: string) => {
    const match = findUrl(text)
    if (match === null) {
      return null
    }
    const fullMatch = match[0]

    const linkMatcher: ReturnType<LinkMatcher> = {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith('http')
        ? fullMatch
        : `https://${fullMatch}`,
      attributes: { rel: 'noreferrer', target: '_blank' },
    }

    return linkMatcher
  },
]

export const AutoLinkPlugin = typedMemo(() => {
  return <LexicalAutoLinkPlugin matchers={MATCHERS} />
})
