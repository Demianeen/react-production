import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import styles from './NotFoundPage.module.scss'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = ({
  className,
}: NotFoundPageProps) => {
  const { t } = useTranslation()

  return (
    <div
      className={classNames(styles.notFoundPage, {}, [
        className,
      ])}
    >
      {t('Page not found')}
    </div>
  )
}
