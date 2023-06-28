import type { FC, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useUserJsonSettings } from '@/entities/User'
import { Theme } from '../../../../shared/const/theme'
import { ThemeContext } from '../../../../shared/lib/context/ThemeContext/ThemeContext'

interface ThemeProviderProps {
  initialTheme?: Theme
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const { theme: defaultTheme = Theme.LIGHT } = useUserJsonSettings()

  const [theme, setTheme] = useState<Theme>(
    initialTheme ?? defaultTheme
  )
  const [isThemeInitialized, setIsThemeInitialized] = useState(false)
  document.body.className = theme

  useEffect(() => {
    if (!isThemeInitialized) {
      setIsThemeInitialized(true)
      setTheme(defaultTheme)
    }
  }, [defaultTheme, isThemeInitialized])

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
