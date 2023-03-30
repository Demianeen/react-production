import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

// component to test ErrorBoundary
export const BugButton = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])

  const onThrow = () => {
    setError(true)
  }

  return (
    <Button theme={ButtonTheme.CLEAR} onClick={onThrow}>
      {t('Throw error')}
    </Button>
  )
}
