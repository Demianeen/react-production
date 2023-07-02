import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useTheme } from '@/shared/hooks/useTheme/useTheme'
import { useSaveJsonSettings } from '@/entities/User'
import { Icon } from '@/shared/ui/Icon'
import ThemeIcon from '@/shared/assets/icons/deprecated/theme-40-41.svg'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme()
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
        <Icon
          Svg={ThemeIcon}
          color='invertedPrimary'
          width={40}
          height={40}
        />
      </Button>
    )
  }
)

ThemeSwitcher.displayName = 'ThemeSwitcher'
