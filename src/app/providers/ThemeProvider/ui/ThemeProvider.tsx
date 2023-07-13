import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'
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
  const [theme, setTheme] = useState<Theme>(
    initialTheme ?? Theme.DARK
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
