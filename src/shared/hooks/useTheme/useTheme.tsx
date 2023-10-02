import { useContext } from 'react'
import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '../../lib/context/ThemeContext/ThemeContext'

interface UseThemeResult {
  toggleTheme: (saveAction?: (newTheme: Theme) => void) => void
  theme: Theme
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = (saveAction?: (newTheme: Theme) => void) => {
    let newTheme: Theme
    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.ORANGE
        break
      case Theme.ORANGE:
        newTheme = Theme.DARK
        break
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme(newTheme)
    document.body.className = newTheme
    saveAction?.(newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
