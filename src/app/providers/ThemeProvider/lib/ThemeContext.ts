import { createContext } from 'react'

export enum Theme {
  LIGHT = 'appLightTheme',
  DARK = 'appDarkTheme',
  RED = 'appRedTheme',
}

export interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext =
  createContext<ThemeContextProps>({} as ThemeContextProps)
