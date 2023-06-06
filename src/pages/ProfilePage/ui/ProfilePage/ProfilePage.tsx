import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  EditableProfileCard,
  getProfileError,
} from '@/features/EditableProfileCard'
import { Text, TextTheme } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { ProfileRating } from '@/features/ProfileRating'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const { id } = useParams()
  const error = useSelector(getProfileError)

  if (id === undefined) {
    return (
      <VStack
        maxHeight
        maxWidth
        justify='center'
        align='center'
      >
        <Text
          theme={TextTheme.ERROR}
          title={t('Profile not found')}
        />
      </VStack>
    )
  }

  const numberId = Number(id)

  return (
    <Page data-testid='ProfilePage'>
      <EditableProfileCard id={numberId} />
      {error === undefined && (
        <ProfileRating profileId={numberId} />
      )}
    </Page>
  )
}

export default memo(ProfilePage)
