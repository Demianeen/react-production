import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  Theme,
  useTheme,
} from 'app/providers/ThemeProvider'
import DarkIcon from 'shared/assets/icons/theme-dark-40-41.svg'
import LightIcon from 'shared/assets/icons/theme-light-40-41.svg'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(
  ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
      <Button
        type='button'
        onClick={toggleTheme}
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
