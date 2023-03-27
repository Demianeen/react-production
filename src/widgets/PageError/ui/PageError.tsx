import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import {
  Button,
  ThemeButton,
} from 'shared/ui/Button/Button'
import styles from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError = ({
  className,
}: PageErrorProps) => {
  const { t } = useTranslation()

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div
      className={classNames(styles.pageError, {}, [
        className,
      ])}
    >
      <h1>{t('Unexpected error')}</h1>
      <Button
        onClick={reloadPage}
        theme={ThemeButton.CLEAR}
      >
        {t('Reload page')}
      </Button>
    </div>
  )
}
