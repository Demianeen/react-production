import type { Theme } from '@/shared/const/theme'

export interface OriginalJsonSettings {
  theme: Theme
  language: string
  isArticlePageWasOpened: boolean
}

export type JsonSettings = Partial<OriginalJsonSettings>
