import { createContext } from 'react'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext =
  createContext<ThemeContextProps>({} as ThemeContextProps)

export const LOCAL_STORAGE_THEME_KEY = 'theme'
