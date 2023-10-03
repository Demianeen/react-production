import type { Plugin } from 'prettier'
import { getEstreePlugin } from './getEstreePlugin'
import { PRETTIER_PARSER_MODULES } from '../const/prettierParserModules'
import type { PrettierLanguage } from '../types/prettier'

export const getPrettierPlugins = async (
  lang: PrettierLanguage,
): Promise<Plugin[]> => {
  const dynamicImport =
    PRETTIER_PARSER_MODULES[lang as PrettierLanguage]

  if (lang === 'js' || lang === 'typescript') {
    // @ts-expect-error bug from prettier https://github.com/prettier/prettier/issues/15136
    return Promise.all([dynamicImport(), getEstreePlugin()])
  }
  return Promise.all([dynamicImport()])
}
