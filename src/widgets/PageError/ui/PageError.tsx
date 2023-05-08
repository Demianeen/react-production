import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'

interface PageErrorProps {
  className?: string
  text?: string
}

export const PageError = memo(
  ({ className, ...props }: PageErrorProps) => {
    const { t } = useTranslation()
    const { text = t('Something went wrong') } = props

    const reloadPage = () => {
      window.location.reload()
    }

    return (
      <VStack
        justify='center'
        align='center'
        gap={0.25}
        maxWidth
        maxHeight
        className={className}
      >
        <Text title={text} />
        <Button type='button' onClick={reloadPage}>
          {t('Reload page')}
        </Button>
      </VStack>
    )
  }
)

PageError.displayName = 'PageError'
