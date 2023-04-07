import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

const AboutPage = memo(() => {
  const { t } = useTranslation('about')

  return <div>{t('About us')}</div>
})

AboutPage.displayName = 'AboutPage'

export default AboutPage
