import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  EditableProfileCard,
  getProfileError,
} from '@/features/EditableProfileCard'
import { Text, TextTheme } from '@/shared/ui/deprecated/Text'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ProfileRating } from '@/features/ProfileRating'
import { useSelector } from 'react-redux'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'

const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const { id } = useParams()
  const error = useSelector(getProfileError)

  if (id === undefined) {
    return (
      <VStack maxHeight maxWidth justify='center' align='center'>
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Title level={2} tag='h1'>
              {t('Profile not found')}
            </Title>
          }
          off={
            <Text
              theme={TextTheme.ERROR}
              title={t('Profile not found')}
            />
          }
        />
      </VStack>
    )
  }

  const numberId = Number(id)

  return (
    <VStack gap={1} as={Page} data-testid='ProfilePage'>
      <EditableProfileCard id={numberId} />
      {error === undefined && <ProfileRating profileId={numberId} />}
    </VStack>
  )
}

export default memo(ProfilePage)
