import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from 'shared/ui/Page/Page'

const AboutPage = memo(() => {
  const { t } = useTranslation('about')

  return <Page>{t('About us')}</Page>
})

AboutPage.displayName = 'AboutPage'

export default AboutPage
