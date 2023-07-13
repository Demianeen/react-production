import { ThemeProvider } from '@/app/providers/ThemeProvider/ui/ThemeProvider'
import { useJsonSettingOnUserInit } from '@/entities/User'
import type { Theme } from '@/shared/const/theme'
import type { ComponentType } from 'react'
import { useState } from 'react'

export const withTheme = (Component: ComponentType) => {
  return function WithTheme() {
    const [initialTheme, setInitialTheme] = useState<Theme>()
    useJsonSettingOnUserInit('theme', setInitialTheme)

    return (
      <ThemeProvider initialTheme={initialTheme}>
        <Component />
      </ThemeProvider>
    )
  }
}
