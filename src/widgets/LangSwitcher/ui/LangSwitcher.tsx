import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { classNames } from 'shared/lib/classNames/classNames'

interface LangSwitcherProps {
  className?: string
  short?: boolean
}

export const LangSwitcher = ({
  className,
  short = false,
}: LangSwitcherProps) => {
  const { t, i18n } = useTranslation()

  const onToggleLanguage = () => {
    i18n.changeLanguage(
      i18n.language === 'ua' ? 'en' : 'ua'
    )
  }

  return (
    <Button
      className={classNames('', {}, [className])}
      theme={ButtonTheme.CLEAR}
      onClick={onToggleLanguage}
    >
      {t(short ? 'Short language' : 'Language')}
    </Button>
  )
}
