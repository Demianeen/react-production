import {
  useSaveJsonSettings,
  useUserJsonSettings,
} from '@/entities/User'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { MobileView } from '@/shared/lib/components/UserAgent/MobileView'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { Text } from '@/shared/ui/deprecated/Text'
import { Modal } from '@/shared/ui/deprecated/Modal'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'

export const ArticlePageGreeting = typedMemo(() => {
  const { t } = useTranslation('articles')

  const [isOpen, setIsOpen] = useState(false)
  const { isArticlesPageWasOpened } = useUserJsonSettings()
  const saveJsonSettings = useSaveJsonSettings()

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true)
      saveJsonSettings({
        isArticlesPageWasOpened: true,
      })
    }
  }, [isArticlesPageWasOpened, saveJsonSettings])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const text = useMemo(
    () => (
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <>
            <Title>{t('Welcome to the articles page')}</Title>
            {t('Here you can view articles on different topics')}
          </>
        }
        off={
          <Text
            title={t('Welcome to the articles page')}
            text={t('Here you can view articles on different topics')}
          />
        }
      />
    ),
    [t]
  )
  return (
    <>
      <DesktopView>
        <Modal lazy isOpen={isOpen} onClose={onClose}>
          {text}
        </Modal>
      </DesktopView>
      <MobileView>
        <Drawer isOpen={isOpen} onClose={onClose}>
          {text}
        </Drawer>
      </MobileView>
    </>
  )
})
