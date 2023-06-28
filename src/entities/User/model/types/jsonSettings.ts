import type { Theme } from '@/shared/const/theme'

export interface OriginalJsonSettings {
  theme: Theme
  language: string
  isFirstVisit: boolean
  settingPageHasBeenOpened: boolean
}

export type JsonSettings = Partial<OriginalJsonSettings>
