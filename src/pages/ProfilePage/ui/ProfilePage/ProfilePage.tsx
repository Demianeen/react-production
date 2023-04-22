import React, { memo } from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const { id } = useParams()

  if (id === undefined) {
    return (
      <Text
        theme={TextTheme.ERROR}
        text={t('Profile not found')}
      />
    )
  }

  return (
    <div>
      <EditableProfileCard id={Number(id)} />
    </div>
  )
}

export default memo(ProfilePage)
