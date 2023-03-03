import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ThemeButton,
} from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './LangSwitcher.module.scss'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher = ({
  className,
}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const onToggleLanguage = () => {
    i18n.changeLanguage(
      i18n.language === 'ua' ? 'en' : 'ua'
    )
  }

  return (
    <Button
      className={classNames(styles.langSwitcher, {}, [
        className,
      ])}
      theme={ThemeButton.CLEAR}
      onClick={onToggleLanguage}
    >
      {t('Language')}
    </Button>
  )
}
