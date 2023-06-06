import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'

const HomePage = () => {
  const { t } = useTranslation('home')

  return <Page data-testid='HomePage'>{t('Home')}</Page>
}

export default memo(HomePage)
