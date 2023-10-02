import type { Promised } from '@/shared/types/promise'

export type Lexical = {
  Main: typeof import('lexical')
  Code: typeof import('@lexical/code')
  Link: typeof import('@lexical/link')
  List: typeof import('@lexical/list')
  Markdown: typeof import('@lexical/markdown')
  // @ts-expect-error temporary
  React: typeof import('@lexical/react')
  RichText: typeof import('@lexical/rich-text')
  Selection: typeof import('@lexical/selection')
  Utils: typeof import('@lexical/utils')
}

export type PromisedLexical = Promised<Lexical>
