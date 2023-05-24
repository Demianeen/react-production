import { memo } from 'react'
import { EditableProfileCard } from 'features/EditableProfileCard'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Page } from 'widgets/Page/ui/Page/Page'
import { VStack } from 'shared/ui/Stack'

const ProfilePage = () => {
  const { t } = useTranslation('profile')
  const { id } = useParams()

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

  return (
    <Page>
      <EditableProfileCard id={Number(id)} />
    </Page>
  )
}

export default memo(ProfilePage)
