import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage'
import { Theme } from 'app/providers/ThemeProvider/const/theme'
import { ThemeContext } from './ThemeContext'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    let newTheme
    switch (theme) {
      case Theme.LIGHT:
        newTheme = Theme.RED
        break
      case Theme.RED:
        newTheme = Theme.DARK
        break
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme(newTheme)
    document.body.className = theme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
