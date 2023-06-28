import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  useSaveJsonSettings,
  useUserJsonSettings,
} from '@/entities/User'
import styles from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(
  ({ className, short = false }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const { language } = useUserJsonSettings()
    const saveJsonSettings = useSaveJsonSettings()

    const onToggleLanguage = useCallback(() => {
      const newLanguage = i18n.language === 'ua' ? 'en' : 'ua'
      i18n.changeLanguage(newLanguage)
      saveJsonSettings({
        language: newLanguage,
      })
    }, [i18n, saveJsonSettings])

    useEffect(() => {
      if (language) {
        i18n.changeLanguage(language)
      }
    }, [i18n, language])

    return (
      <Button
        type='button'
        className={classNames(styles.langSwitcher, {}, [className])}
        theme={ButtonTheme.CLEAR}
        onClick={onToggleLanguage}
      >
        {t(short ? 'Short language' : 'Language')}
      </Button>
    )
  }
)

LangSwitcher.displayName = 'LangSwitcher'
