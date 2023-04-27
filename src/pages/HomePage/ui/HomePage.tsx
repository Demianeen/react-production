import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'shared/ui/Page/Page'

const HomePage = () => {
  const { t } = useTranslation('home')

  return <Page>{t('Home')}</Page>
}

export default memo(HomePage)
