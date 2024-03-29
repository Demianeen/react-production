import { useTranslation } from 'react-i18next'
import {
  Text,
  TextSize,
  TextTheme,
} from '@/shared/ui/deprecated/Text'
import { Page } from '@/widgets/Page'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeature } from '@/shared/lib/features'
import { Title } from '@/shared/ui/redesigned/Title'

interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation()
  return (
    <Page className={className} data-testid='ForbiddenPage'>
      <HStack justify='center' align='center' maxHeight maxWidth>
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Title>{t("You don't have access to this page")}</Title>
          }
          off={
            <Text
              theme={TextTheme.ERROR}
              size={TextSize.L}
              text={t("You don't have access to this page")}
            />
          }
        />
      </HStack>
    </Page>
  )
}

export default ForbiddenPage
