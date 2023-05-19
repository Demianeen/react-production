import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page'
import { HStack } from 'shared/ui/Stack'

interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = ({
  className,
}: ForbiddenPageProps) => {
  const { t } = useTranslation()
  return (
    <Page className={className}>
      <HStack>
        <Text
          text={t("You don't have access to this page")}
        />
      </HStack>
    </Page>
  )
}

export default ForbiddenPage
