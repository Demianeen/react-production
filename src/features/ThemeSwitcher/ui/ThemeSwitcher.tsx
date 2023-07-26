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
import { TooltipButton } from '@/shared/ui/redesigned/TooltipButton'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'

interface ThemeSwitcherProps {
  className?: string
  tooltipPosition?: Position
  withText?: boolean
}

export const ThemeSwitcher = memo(
  ({
    className,
    tooltipPosition,
    withText = false,
  }: ThemeSwitcherProps) => {
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
          <TooltipButton
            type='button'
            tooltipText='Toggle theme'
            tooltipPosition={tooltipPosition}
            variant='clear'
            disableTooltip={withText}
            onClick={onToggleTheme}
            className={getHStackClassName({
              justify: 'center',
              align: 'center',
              gap: 0.5,
            })}
          >
            <Icon Svg={ThemeIcon} clickable noWrapWithButton />
            {withText && 'Toggle theme'}
          </TooltipButton>
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
