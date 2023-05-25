import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/ui/Page/Page'
import { HStack } from '@/shared/ui/Stack'
import {
  Text,
  TextSize,
  TextTheme,
} from '@/shared/ui/Text/Text'

interface NotFoundPageProps {
  className?: string
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
  const { t } = useTranslation()

  return (
    <Page className={className}>
      <HStack
        justify='center'
        align='center'
        maxHeight
        maxWidth
      >
        <Text
          theme={TextTheme.ERROR}
          size={TextSize.L}
          title={t('Page not found')}
        />
      </HStack>
    </Page>
  )
}

export default memo(NotFoundPage)
