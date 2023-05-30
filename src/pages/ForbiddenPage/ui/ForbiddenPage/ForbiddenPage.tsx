import { useTranslation } from 'react-i18next'
import { Text, TextSize, TextTheme } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'
import { HStack } from '@/shared/ui/Stack'

interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = ({
  className,
}: ForbiddenPageProps) => {
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
          text={t("You don't have access to this page")}
        />
      </HStack>
    </Page>
  )
}

export default ForbiddenPage
