import { promiseAllMap } from '../../../promise/promiseAllMap'
import type { PromisedLexical } from '../types/lexical'

export const getAsyncLexicalModules = () => {
  // @ts-expect-error temporary
  const lexicalModules: PromisedLexical = {
    Main: import('lexical'),
    Code: import('@lexical/code'),
    Link: import('@lexical/link'),
    List: import('@lexical/list'),
    Markdown: import('@lexical/markdown'),
    // eslint-disable-next-line import/no-unresolved
    // React: import('@lexical/react'),
    RichText: import('@lexical/rich-text'),
    Selection: import('@lexical/selection'),
    Utils: import('@lexical/utils'),
  }

  return promiseAllMap(lexicalModules)
}
