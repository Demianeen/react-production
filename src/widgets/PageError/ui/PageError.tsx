import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
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
        <Text title={t('Something went wrong')} />
        <Button type='button' onClick={reloadPage}>
          {t('Reload page')}
        </Button>
      </div>
    )
  }
)

PageError.displayName = 'PageError'
