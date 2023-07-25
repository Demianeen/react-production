import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useTheme } from '@/shared/hooks/useTheme/useTheme'
import { useSaveJsonSettings } from '@/entities/User'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import ThemeIcon from '@/shared/assets/icons/redesigned/theme.svg'
import ThemeIconDeprecated from '@/shared/assets/icons/deprecated/theme-40-41.svg'
import { ToggleFeature } from '@/shared/lib/features'
import type { Position } from '@/shared/types/position'

interface ThemeSwitcherProps {
  className?: string
  tooltipPosition?: Position
}

export const ThemeSwitcher = memo(
  ({ className, tooltipPosition }: ThemeSwitcherProps) => {
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
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={ThemeIcon}
            tooltipText='Toggle theme'
            onClick={onToggleTheme}
            tooltipPosition={tooltipPosition}
          />
        }
        off={
          <Button
            type='button'
            onClick={onToggleTheme}
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
          >
            <IconDeprecated
              Svg={ThemeIconDeprecated}
              color='invertedPrimary'
              width={40}
              height={40}
            />
          </Button>
        }
      />
    )
  }
)

ThemeSwitcher.displayName = 'ThemeSwitcher'
