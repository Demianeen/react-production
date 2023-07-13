import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'

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
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <>
              <Title>{text}</Title>
              <Button type='button' onClick={reloadPage}>
                {t('Reload page')}
              </Button>
            </>
          }
          off={
            <>
              <TextDeprecated title={text} />
              <ButtonDeprecated type='button' onClick={reloadPage}>
                {t('Reload page')}
              </ButtonDeprecated>
            </>
          }
        />
      </VStack>
    )
  }
)

PageError.displayName = 'PageError'
