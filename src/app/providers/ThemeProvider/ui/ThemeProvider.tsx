import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'
import { Theme } from '../../../../shared/const/theme'
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext/ThemeContext'

const defaultTheme =
  (localStorage.getItem(
    LOCAL_STORAGE_THEME_KEY
  ) as Theme) ?? Theme.LIGHT

interface ThemeProviderProps {
  initialTheme?: Theme
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<Theme>(
    initialTheme ?? defaultTheme
  )
  document.body.className = theme

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}
