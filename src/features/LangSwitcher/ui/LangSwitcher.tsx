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
import { Button } from '@/shared/ui/redesigned/Button'
import { ToggleFeature } from '@/shared/lib/features'
import styles from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(
  ({ className, short = false }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const saveJsonSettings = useSaveJsonSettings()

    const onToggleLanguage = useCallback(() => {
      const newLanguage = i18n.language === 'ua' ? 'en' : 'ua'
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
          <Button
            type='button'
            variant='clear'
            onClick={onToggleLanguage}
          >
            {t('Short language')}
          </Button>
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
