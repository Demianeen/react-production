import type { PRETTIER_PARSER_MODULES } from '../const/prettierParserModules'

export type PrettierStandalone = typeof import('prettier/standalone')

export type EstreePlugin = typeof import('prettier/plugins/estree')
export type BabelPlugin = typeof import('prettier/plugins/babel')
export type PostcssPlugin = typeof import('prettier/plugins/postcss')
export type HtmlPlugin = typeof import('prettier/plugins/html')
export type MarkdownPlugin =
  typeof import('prettier/plugins/markdown')

/**
 * Avaliable languages for prettier.
 */
export type PrettierLanguage = keyof typeof PRETTIER_PARSER_MODULES
