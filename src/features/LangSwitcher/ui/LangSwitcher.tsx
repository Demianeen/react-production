import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  useJsonSettingOnUserInit,
  useSaveJsonSettings,
} from '@/entities/User'
import { ToggleFeature } from '@/shared/lib/features'
import { Typography } from '@/shared/ui/redesigned/Typography'
import { TooltipButton } from '@/shared/ui/redesigned/TooltipButton'
import type { Position } from '@/shared/types/position'
import styles from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
  short?: boolean
  tooltipPosition?: Position
}

export const LangSwitcher = memo(
  ({
    className,
    short = false,
    tooltipPosition,
  }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const saveJsonSettings = useSaveJsonSettings()

    const onToggleLanguage = useCallback(() => {
      const newLanguage = i18n.language === 'uk' ? 'en' : 'uk'
      i18n.changeLanguage(newLanguage)
      saveJsonSettings({
        language: newLanguage,
      })
    }, [i18n, saveJsonSettings])

    const onLanguageChange = useCallback(
      (newLanguage: string) => {
        i18n.changeLanguage(newLanguage)
      },
      [i18n]
    )

    useJsonSettingOnUserInit('language', onLanguageChange)

    return (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <TooltipButton
            tooltipText='Change language'
            type='button'
            variant='clear'
            onClick={onToggleLanguage}
            tooltipPosition={tooltipPosition}
          >
            <Typography tag='span' variant='icon' clickable>
              {t('Short language')}
            </Typography>
          </TooltipButton>
        }
        off={
          <ButtonDeprecated
            type='button'
            className={classNames(styles.langSwitcher, {}, [
              className,
            ])}
            theme={ButtonTheme.CLEAR}
            onClick={onToggleLanguage}
          >
            {t(short ? 'Short language' : 'Language')}
          </ButtonDeprecated>
        }
      />
    )
  }
)

LangSwitcher.displayName = 'LangSwitcher'
