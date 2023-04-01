import React from 'react'
import { useTranslation } from 'react-i18next'
import { Counter } from 'entities/Counter'

const HomePage = () => {
  const { t } = useTranslation('home')

  return (
    <div>
      {t('Home')}
      <Counter />
    </div>
  )
}

export default HomePage
