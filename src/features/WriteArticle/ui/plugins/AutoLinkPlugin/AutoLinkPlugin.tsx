import type { LinkMatcher } from '@lexical/react/LexicalAutoLinkPlugin'
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const MATCHERS: LinkMatcher[] = [
  (text: string) => {
    const match = URL_MATCHER.exec(text)
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
