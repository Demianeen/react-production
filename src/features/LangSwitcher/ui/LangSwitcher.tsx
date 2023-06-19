import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = memo(
  ({ className, short = false }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const onToggleLanguage = () => {
      i18n.changeLanguage(i18n.language === 'ua' ? 'en' : 'ua')
    }

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
