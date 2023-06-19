import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui/Button'

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
    <Button type='button' theme={ButtonTheme.CLEAR} onClick={onThrow}>
      {t('Throw error')}
    </Button>
  )
}
