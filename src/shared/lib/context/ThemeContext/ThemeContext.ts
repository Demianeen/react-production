import { createContext } from 'react'
import type { Theme } from '@/shared/const/theme'

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext =
  createContext<ThemeContextProps>({} as ThemeContextProps)
