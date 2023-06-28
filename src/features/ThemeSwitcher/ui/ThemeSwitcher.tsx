import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import DarkIcon from '@/shared/assets/icons/theme-dark-40-41.svg'
import LightIcon from '@/shared/assets/icons/theme-light-40-41.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useTheme } from '@/shared/hooks/useTheme/useTheme'
import { Theme } from '@/shared/const/theme'
import { useSaveJsonSettings } from '@/entities/User'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    const saveJsonSettings = useSaveJsonSettings()

    const onToggleTheme = useCallback(() => {
      toggleTheme((newTheme) => {
        saveJsonSettings({
          theme: newTheme,
        })
      })
    }, [saveJsonSettings, toggleTheme])

    return (
      <Button
        type='button'
        onClick={onToggleTheme}
        theme={ButtonTheme.CLEAR}
        className={classNames('', {}, [className])}
      >
        {theme === Theme.LIGHT || theme === Theme.RED ? (
          <LightIcon />
        ) : (
          <DarkIcon />
        )}
      </Button>
    )
  }
)

ThemeSwitcher.displayName = 'ThemeSwitcher'
