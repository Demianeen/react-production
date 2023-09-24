import type { PrettierLanguage } from '../types/prettier'
import { PRETTIER_OPTIONS_BY_LANG } from '../const/prettierOptionsByLang'

const LANG_CAN_BE_PRETTIER = Object.keys(PRETTIER_OPTIONS_BY_LANG)

export const canBePrettier = (
  lang: string,
): lang is PrettierLanguage => LANG_CAN_BE_PRETTIER.includes(lang)
