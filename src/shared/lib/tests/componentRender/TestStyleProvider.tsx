// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import type { Theme } from '@/shared/const/theme'
// eslint-disable-next-line netliukh-demian-fsd-plugin/layer-imports
import '@/app/styles/index.scss'

interface TestStyleProviderProps {
  children: React.ReactNode
  theme: Theme
}

export const TestStyleProvider = ({
  children,
  theme,
}: TestStyleProviderProps) => {
  return (
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeProvider>
  )
}
