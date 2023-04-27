import React, { memo } from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/ui/Page/Page'

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
    <Page>
      <EditableProfileCard id={Number(id)} />
    </Page>
  )
}

export default memo(ProfilePage)
