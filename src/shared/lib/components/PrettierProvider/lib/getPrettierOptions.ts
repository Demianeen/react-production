import type { Options } from 'prettier'
import { getPrettierPlugins } from './getPrettierPlugins'
import { PRETTIER_OPTIONS_BY_LANG } from '../const/prettierOptionsByLang'
import type { PrettierLanguage } from '../types/prettier'

export const getPrettierOptions = async (
  lang: PrettierLanguage,
): Promise<Options> => {
  const options = PRETTIER_OPTIONS_BY_LANG[lang]

  if (!options) {
    throw new Error(
      `CodeActionMenuPlugin: Prettier does not support this language: ${lang}`,
    )
  }

  options.plugins = await getPrettierPlugins(lang)

  return options
}
