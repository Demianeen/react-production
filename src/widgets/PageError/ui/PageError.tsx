import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import styles from './PageError.module.scss'

interface PageErrorProps {
  className?: string
}

export const PageError = memo(
  ({ className }: PageErrorProps) => {
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
        <h1>{t('Something went wrong')}</h1>
        <Button onClick={reloadPage}>
          {t('Reload page')}
        </Button>
      </div>
    )
  }
)

PageError.displayName = 'PageError'
