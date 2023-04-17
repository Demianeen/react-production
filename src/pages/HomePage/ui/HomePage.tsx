import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
  const { t } = useTranslation('home')

  return <div>{t('Home')}</div>
}

export default memo(HomePage)
