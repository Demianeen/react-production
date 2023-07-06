import { ToggleDesign } from '@/features/ToggleDesign'
import { Title } from '@/shared/ui/redesigned/Title'
import { Page } from '@/widgets/Page'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

interface SettingsPageProps {
  className?: string
}

const SettingsPage = memo(({ className }: SettingsPageProps) => {
  const { t } = useTranslation('settings')
  return (
    <Page className={className}>
      <Title level={2} tag='h1'>
        {t('Settings')}
      </Title>
      <ToggleDesign />
    </Page>
  )
})

SettingsPage.displayName = 'SettingsPage'

export default SettingsPage
