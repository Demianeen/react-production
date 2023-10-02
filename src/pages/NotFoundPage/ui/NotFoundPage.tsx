import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'
import { HStack } from '@/shared/ui/redesigned/Stack'
import {
  Text,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text'
import { ToggleFeature } from '@/shared/lib/features'
import { Title } from '@/shared/ui/redesigned/Title'

interface NotFoundPageProps {
  className?: string
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation()

  return (
    <HStack
      as={Page}
      justify='center'
      align='center'
      maxHeight
      maxWidth
      data-testid='NotFoundPage'
      className={className}
    >
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Title level={2} tag='h1'>
            {t('Page not found')}
          </Title>
        }
        off={
          <Text
            theme={TextTheme.ERROR}
            size={TextSize.L}
            title={t('Page not found')}
          />
        }
      />
    </HStack>
  )
}

export default memo(NotFoundPage)
