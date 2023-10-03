import type { Options } from 'prettier'
import type { LanguagesType } from '..'

export const PRETTIER_OPTIONS_BY_LANG: Record<
  LanguagesType,
  Options
> = {
  css: {
    parser: 'css',
  },
  html: {
    parser: 'html',
  },
  js: {
    parser: 'babel',
  },
  typescript: {
    parser: 'babel-ts',
  },
  markdown: {
    parser: 'markdown',
  },
}
